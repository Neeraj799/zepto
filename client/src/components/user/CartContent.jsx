import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/user/cartSlice";
import { toast } from "sonner";

const CartContent = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.userCart);
  const { productList } = useSelector((state) => state.userProducts);

  const handleUpdateQuantity = (getCartItem, typeOfAction) => {
    if (typeOfAction == "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem.productId
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
      {cartItems?.items?.length > 0 ? (
        cartItems?.items?.map((item) => (
          <div
            key={item.productId}
            className="flex items-center space-x-4 px-4"
          >
            <img
              src={item?.image}
              alt={item?.title}
              className="w-20 h-20 rounded object-cover"
            />
            <div className="flex-1">
              <h3 className="font-extrabold">{item?.title}</h3>
              <div className="flex items-center mt-1 gap-4">
                <Button
                  variant="outline"
                  className="h-8 w-8 rounded-full"
                  size="icon"
                  disabled={item?.quantity === 1}
                  onClick={() => handleUpdateQuantity(item, "minus")}
                >
                  <Minus className="w-4 h-4" />
                  <span className="sr-only">Decrease</span>
                </Button>
                <span className="font-semibold">{item?.quantity}</span>

                <Button
                  variant="outline"
                  className="h-8 w-8 rounded-full"
                  size="icon"
                  onClick={() => handleUpdateQuantity(item, "plus")}
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
                  (item?.salePrice > 0 ? item?.salePrice : item?.price) *
                  item?.quantity
                )?.toFixed(2)}
              </p>
              <Trash
                onClick={() => handleCartItemDelete(item)}
                className="cursor-pointer mt-1"
                size={20}
              />
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartContent;
