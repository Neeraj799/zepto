import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/user/cartSlice";
import { toast } from "sonner";

const CartContent = ({ cartItems }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleUpdateQuantity = (item, typeOfAction) => {
    dispatch(
      updateCartQuantity({
        userId: user?._id,
        productId: item?.productId,
        quantity:
          typeOfAction === "plus" ? item?.quantity + 1 : item.quantity - 1,
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

  return (
    <div className="mt-4">
      <div className="flex items-center space-x-4 px-4">
        <img
          src={cartItems?.image}
          alt={cartItems?.title}
          className="w-20 h-20 rounded object-cover"
        />
        <div className="flex-1">
          <h3 className="font-extrabold">{cartItems?.title}</h3>
          <div className="flex items-center mt-1 gap-4">
            <Button
              variant="outline"
              className="h-8 w-8 rounded-full"
              size="icon"
              disabled={cartItems?.quantity === 1}
              onClick={() => handleUpdateQuantity(cartItems, "minus")}
            >
              <Minus className="w-4 h-4" />
              <span className="sr-only">Decrease</span>
            </Button>
            <span className="font-semibold">{cartItems?.quantity}</span>

            <Button
              variant="outline"
              className="h-8 w-8 rounded-full"
              size="icon"
              onClick={() => handleUpdateQuantity(cartItems, "plus")}
            >
              <Plus className="w-4 h-4" />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-semibold">
            $
            {(cartItems?.salePrice > 0
              ? cartItems?.salePrice
              : cartItems?.price) * cartItems?.quantity.toFixed(2)}
          </p>
          <Trash
            onClick={() => handleCartItemDelete(cartItems)}
            className="cursor-pointer mt-1"
            size={20}
          />
        </div>
      </div>
    </div>
  );
};

export default CartContent;
