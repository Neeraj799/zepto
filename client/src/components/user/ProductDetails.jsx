import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/user/cartSlice";
import { toast } from "sonner";
import { setProductDetails } from "@/store/user/productSlice";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "../ui/label";
import StarRating from "../common/StarRating";
import { addReview, getReviews } from "@/store/user/reviewSlice";

const ProductDetails = ({ open, setOpen, productDetails }) => {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.userCart);
  const { reviews } = useSelector((state) => state.userReview);

  const handleRatingChange = (getRating) => {
    setRating(getRating);
  };

  const handleAddToCart = (productId, getTotalStock) => {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === productId
      );

      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;

        if (getQuantity + 1 > getTotalStock) {
          toast.error(`Only ${getQuantity} quantity canbe added for this item`);
          return;
        }
      }
    }

    dispatch(addToCart({ userId: user?._id, productId, quantity: 1 })).then(
      (data) => {
        if (data?.payload.success) {
          console.log("data", data);
          console.log("user", user);

          dispatch(fetchCartItems({ id: user?._id }));
          toast.success("Product added to cart");
        }
      }
    );
  };

  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  };

  const handleAddReview = () => {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?._id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast.success("Review added successfully");
      } else {
        toast.error(data.payload.message || "Failed to submit review");
      }
    });
  };

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getReviews(productDetails?._id));
    }
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  console.log("reviews", reviews);

  return (
    <div>
      <Dialog open={open} onOpenChange={handleDialogClose}>
        <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              width={600}
              height={600}
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="">
            <div>
              <DialogTitle className="text-3xl font-bold">
                {productDetails?.title}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-lg mb-10">
                {productDetails?.description}
              </DialogDescription>
            </div>
            <div className="flex items-center justify-between">
              <p
                className={`text-2xl font-bold text-primary ${
                  productDetails?.price > 0 ? "line-through" : ""
                }`}
              >
                ${productDetails?.price}
              </p>
              {productDetails?.salePrice > 0 ? (
                <p className="text-2xl font-bold text-muted-foreground">
                  ${productDetails?.salePrice}
                </p>
              ) : null}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-0.5">
                <StarRating rating={averageReview} />
              </div>
              <span className="text-muted-foreground">
                ({averageReview.toFixed(2)})
              </span>
            </div>
            <div>
              {productDetails?.totalStock === 0 ? (
                <Button className="w-full mt-10 mb-6 opacity-60 cursor-not-allowed">
                  Out Of Stock
                </Button>
              ) : (
                <Button
                  className="w-full mt-10 mb-6"
                  onClick={() =>
                    handleAddToCart(
                      productDetails?._id,
                      productDetails?.totalStock
                    )
                  }
                >
                  Add to cart
                </Button>
              )}
            </div>
            <Separator />
            <div className="max-h-[300px] overflow-auto">
              <h2 className="text-xl font-bold mb-4 mt-2">Reviews</h2>
              <div className="grid gap-6">
                {reviews && reviews.length > 0 ? (
                  reviews.map((reviewItem) => (
                    <div className="flex gap-4">
                      <Avatar className="w-10 h-10 border">
                        <AvatarFallback>
                          {reviewItem?.userName[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{reviewItem?.userName}</h3>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <StarRating rating={reviewItem.reviewValue} />
                        </div>
                        <p className="text-muted-foreground">
                          {reviewItem.reviewMessage}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1>No Reviews</h1>
                )}
              </div>
              <div className="mt-10 flex-col flex gap-2">
                <Label>Write a review</Label>
                <div className="flex gap-2">
                  <StarRating
                    rating={rating}
                    handleRatingChange={handleRatingChange}
                  />
                </div>
                <Input
                  name="reviewMsg"
                  value={reviewMsg}
                  onChange={(e) => setReviewMsg(e.target.value)}
                  placeholder="Write a review..."
                />
                <Button
                  onClick={handleAddReview}
                  disabled={reviewMsg.trim() === ""}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetails;
