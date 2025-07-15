import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/user/cartSlice";
import { toast } from "sonner";

const CartContent = ({ cartItem }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.userCart);
  const { productList } = useSelector((state) => state.userProducts);
  const dispatch = useDispatch();

  const handleUpdateQuantity = (getCartItem, typeOfAction) => {
    if (typeOfAction == "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );

        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;

          if (getQuantity + 1 > getTotalStock) {
            toast.error(
              `Only ${getQuantity} quantity can be added for this item`
            );
            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?._id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem.quantity - 1,
      })
    ).then((data) => {
      if (data.payload.success) {
        toast.success("Cart item updated successfully");
      }
    });
  };

  const handleCartItemDelete = async (item) => {
    dispatch(
      deleteCartItem({ userId: user?._id, productId: item?.productId })
    ).then((data) => {
      if (data.payload.success) {
        toast.success("Cart item deleted successfully");
      }
    });
  };

  console.log("cartItems", cartItems.items);

  return (
    <div className="mt-4">
      <div className="flex items-center space-x-4 px-4">
        <img
          src={cartItem?.image}
          alt={cartItem?.title}
          className="w-20 h-20 rounded object-cover"
        />
        <div className="flex-1">
          <h3 className="font-extrabold">{cartItem?.title}</h3>
          <div className="flex items-center mt-1 gap-4">
            <Button
              variant="outline"
              className="h-8 w-8 rounded-full"
              size="icon"
              disabled={cartItem?.quantity === 1}
              onClick={() => handleUpdateQuantity(cartItem, "minus")}
            >
              <Minus className="w-4 h-4" />
              <span className="sr-only">Decrease</span>
            </Button>
            <span className="font-semibold">{cartItem?.quantity}</span>

            <Button
              variant="outline"
              className="h-8 w-8 rounded-full"
              size="icon"
              onClick={() => handleUpdateQuantity(cartItem, "plus")}
            >
              <Plus className="w-4 h-4" />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-semibold">
            $
            {(
              (cartItem?.salePrice > 0
                ? cartItem?.salePrice
                : cartItem?.price) * cartItem?.quantity
            )?.toFixed(2)}
          </p>
          <Trash
            onClick={() => handleCartItemDelete(cartItem)}
            className="cursor-pointer mt-1"
            size={20}
          />
        </div>
      </div>
    </div>
  );
};

export default CartContent;
