import Order from "../../models/Order.js";
import Product from "../../models/product.js";
import Review from "../../models/Review.js";

const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;

    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: "confirmed",
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase product to review it.",
      });
    }

    const checkExistingReview = await Review.findOne({ productId, userId });

    if (checkExistingReview) {
      return res.status(400).json({
        success: false,
        message: "You already reviews this product!",
      });
    }

    const newReview = new Review({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    await newReview.save();

    const reviews = await Review.find({ productId });

    const totalReviewLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewLength;

    await Product.findByIdAndUpdate(productId, { averageReview });

    return res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getProductReview = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ productId });

    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { addProductReview, getProductReview };
