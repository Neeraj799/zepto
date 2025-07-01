import express from "express";
import { getFilteredProducts } from "../../controller/user/product.controller.js";

const router = express.Router();

router.get("/getProduct", getFilteredProducts);

export default router;
