import { Input } from "@/components/ui/input";
import ListProduct from "@/components/user/ListProduct";
import ProductDetails from "@/components/user/ProductDetails";
import { addToCart, fetchCartItems } from "@/store/user/cartSlice";
import { fetchProductDetails } from "@/store/user/productSlice";
import { getSearchResults, resetSearchResults } from "@/store/user/searchSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [openproductDetailsDialog, setOpenProductDetailsDialog] =
    useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.userCart);
  const { productDetails } = useSelector((state) => state.userProducts);
  const { searchResults } = useSelector((state) => state.userSearch);

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword]);

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

  const handleProductDetails = (productId) => {
    dispatch(fetchProductDetails(productId));
  };

  useEffect(() => {
    if (productDetails !== null) {
      setOpenProductDetailsDialog(true);
    }
  }, [productDetails]);

  console.log("productDetails", productDetails);

  return (
    <div className="container px-auto md:px-6 px-4 py-8">
      <div className="flex  justify-center mb-8">
        <div className="w-full">
          <Input
            value={keyword}
            name="keyword"
            onChange={(e) => setKeyword(e.target.value)}
            className="py-6"
            placeholder="Search Products..."
          />
        </div>
      </div>
      {!searchResults.length ? (
        <h1 className="text-5xl font-extrabold">No result found!</h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item) => (
          <ListProduct
            key={item._id}
            productDetails={handleProductDetails}
            handleAddToCart={handleAddToCart}
            product={item}
          />
        ))}
      </div>
      <ProductDetails
        open={openproductDetailsDialog}
        setOpen={setOpenProductDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default Search;
