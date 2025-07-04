import express from "express";
import {
  addToCart,
  deleteCartItem,
  fetchCartItems,
  updateCartItemQty,
} from "../../controller/user/cart.controller.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:id", fetchCartItems);
router.patch("/update-cart", updateCartItemQty);
router.delete("/:userId/:productId", deleteCartItem);

export default router;
