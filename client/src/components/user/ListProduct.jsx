import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const ListProduct = ({ product, productDetails, handleAddToCart }) => {
  return (
    <div className="mt-6 ml-10">
      <Card className="w-full max-w-sm mx-auto overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
        <div
          onClick={() => productDetails(product?._id)}
          className="cursor-pointer"
        >
          <div className="relative group py-0">
            <img
              src={product?.image}
              alt={product.title}
              className="w-full h-[350px] object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-110"
            />
            {product?.totalStock === 0 ? (
              <Badge className="absolute top-3 left-3 bg-red-600 text-white font-semibold px-2 py-1 rounded-lg shadow">
                Out of Stock
              </Badge>
            ) : product?.totalStock < 10 ? (
              <Badge className="absolute top-3 left-3 bg-yellow-500 text-white font-semibold px-2 py-1 rounded-lg shadow">
                {`Only ${product?.totalStock} left`}
              </Badge>
            ) : product?.salePrice > 0 ? (
              <Badge className="absolute top-3 left-3 bg-green-500 text-white font-semibold px-2 py-1 rounded-lg shadow">
                Sale
              </Badge>
            ) : null}
          </div>

          <CardContent className="px-5 py-4">
            <h2 className="text-2xl font-semibold mb-2 hover:text-primary transition-colors duration-200">
              {product?.title}
            </h2>
            <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
              <span className="capitalize">{product?.category}</span>
              <span className="capitalize">{product?.brand}</span>
            </div>

            <div className="flex justify-between items-center">
              <span
                className={`${
                  product?.price > 0 ? "line-through text-gray-400" : ""
                } text-lg font-semibold text-primary`}
              >
                ${product?.price}
              </span>
              {product?.salePrice > 0 && (
                <span className="text-lg font-bold text-red-500">
                  ${product?.salePrice}
                </span>
              )}
            </div>
          </CardContent>
        </div>

        <CardFooter className="p-2">
          {product?.totalStock === 0 ? (
            <Button
              onClick={() => handleAddToCart(product?._id)}
              className="w-full opacity-50 cursor-not-allowed bg-gray-400 hover:bg-gray-400"
            >
              Out Of Stock
            </Button>
          ) : (
            <Button
              onClick={() => handleAddToCart(product?._id, product?.totalStock)}
              className="w-full bg-primary text-white hover:bg-primary/90 transition-colors duration-200"
            >
              Add to cart
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ListProduct;
