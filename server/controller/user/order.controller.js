import { paypal } from "../../helpers/paypal.js";
import Cart from "../../models/Cart.js";
import Order from "../../models/Order.js";
import Product from "../../models/product.js";

const createPaypalPayment = (paymentData) => {
  return new Promise((resolve, reject) => {
    paypal.payment.create(paymentData, function (error, payment) {
      if (error) {
        reject(error);
      } else {
        resolve(payment);
      }
    });
  });
};

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    } = req.body;

    // ✅ Validate essential fields
    if (
      !userId ||
      !cartId ||
      !Array.isArray(cartItems) ||
      cartItems.length === 0
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid order data" });
    }

    if (!totalAmount || isNaN(totalAmount)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid total amount" });
    }

    // ✅ Format PayPal payment data
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `${process.env.CLIENT_BASE_URL}/user/paypal-return`,
        cancel_url: `${process.env.CLIENT_BASE_URL}/user/paypal-cancel`,
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "Order placed from your app",
        },
      ],
    };

    // ✅ Create PayPal payment
    const paymentInfo = await createPaypalPayment(create_payment_json);

    // ✅ Save order to DB
    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    });

    await newlyCreatedOrder.save();

    // ✅ Get approval URL to send back to client
    const approvalURL = paymentInfo.links.find(
      (link) => link.rel === "approval_url"
    )?.href;

    if (!approvalURL) {
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve PayPal approval URL",
      });
    }

    return res.status(201).json({
      success: true,
      approvalURL,
      orderId: newlyCreatedOrder._id,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message || error,
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for this product ${product.title}`,
        });
      }

      product.totalStock -= item.quantity;

      await product.save();
    }

    const getCartId = order.cartId;
    const cart = await Cart.findByIdAndDelete(getCartId);

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order Confirmed",
      data: order,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found!" });
    }

    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found!" });
    }

    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { createOrder, capturePayment, getAllOrdersByUser, getOrderDetails };
