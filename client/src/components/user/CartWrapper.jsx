import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import CartContent from "./CartContent";
import { useNavigate } from "react-router-dom";

const CartWrapper = ({ cartItems, setOpenCart }) => {
  const navigate = useNavigate();
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <>
      <SheetContent className="sm:max-w-md" aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="">
          {cartItems && cartItems.length > 0
            ? cartItems.map((item, index) => (
                <CartContent key={index} cartItems={item} />
              ))
            : null}
        </div>

        <div className="px-4">
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">${totalCartAmount}</span>
          </div>
        </div>
        <Button
          onClick={() => {
            navigate("/user/checkout");
            setOpenCart(false);
          }}
          className="w-full mt-6"
        >
          Checkout
        </Button>
      </SheetContent>
    </>
  );
};

export default CartWrapper;
