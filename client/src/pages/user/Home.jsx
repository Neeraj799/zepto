import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Inbox,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WatchIcon,
} from "lucide-react";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: CloudLightning },
  { id: "puma", label: "Puma", icon: BabyIcon },
  { id: "levi", label: "Levi's", icon: ShoppingBasket },
  { id: "zara", label: "Zara", icon: UmbrellaIcon },
  { id: "h&m", label: "H&M", icon: Inbox },
];

import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/user/productSlice";
import ListProduct from "@/components/user/ListProduct";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/user/cartSlice";
import { toast } from "sonner";
import ProductDetails from "@/components/user/ProductDetails";
import { getFeatureImages } from "@/store/common/commonSlice";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const { productList, productDetails } = useSelector(
    (state) => state.userProducts
  );
  const [openproductDetailsDialog, setOpenProductDetailsDialog] =
    useState(false);
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigateToListingPage = (item, section) => {
    localStorage.removeItem("filters");
    const currentFilter = {
      [section]: [item.id],
    };

    localStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/user/listing");
  };

  const handleProductDetails = (productId) => {
    console.log(productId);
    dispatch(fetchProductDetails(productId));
  };

  const handleAddToCart = (productId) => {
    console.log(productId);

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

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  useEffect(() => {
    if (featureImageList.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featureImageList.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) {
      setOpenProductDetailsDialog(true);
    }
  }, [productDetails]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[250px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                alt={`Slide ${index + 1}`}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}

        {/* Left Arrow */}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prev) =>
                (prev - 1 + featureImageList.length) % featureImageList.length
            )
          }
          className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white transition-all duration-300 rounded-full p-1 sm:p-2"
        >
          <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>

        {/* Right Arrow */}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prev) => (prev + 1) % featureImageList.length)
          }
          className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white transition-all duration-300 rounded-full p-1 sm:p-2"
        >
          <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((category) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(category, "category")
                }
                key={category.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <category.icon className="w-10 h-10 mb-4 text-primary" />
                  <span className="font-bold">{category.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brand) => (
              <Card
                onClick={() => handleNavigateToListingPage(brand, "brand")}
                key={brand.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <brand.icon className="w-10 h-10 mb-4 text-primary" />
                  <span className="font-bold">{brand.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0 ? (
              productList.map((item) => (
                <ListProduct
                  key={item._id}
                  product={item}
                  productDetails={() => handleProductDetails(item._id)}
                  handleAddToCart={handleAddToCart}
                />
              ))
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </section>
      <ProductDetails
        open={openproductDetailsDialog}
        setOpen={setOpenProductDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default Home;
