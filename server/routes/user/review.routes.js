import express from "express";
import {
  addProductReview,
  getProductReview,
} from "../../controller/user/review.controller.js";

const router = express.Router();

router.get("/:productId", getProductReview);
router.post("/add", addProductReview);

export default router;
