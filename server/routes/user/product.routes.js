import express from "express";
import {
  getFilteredProducts,
  getProductDetails,
} from "../../controller/user/product.controller.js";

const router = express.Router();

router.get("/getProduct", getFilteredProducts);
router.get("/getProduct/:id", getProductDetails);

export default router;
