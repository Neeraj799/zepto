import express from "express";
import {
  capturePayment,
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
} from "../../controller/user/order.controller.js";

const router = express.Router();

router.post("/create", createOrder);
router.post("/capture", capturePayment);
router.get("/list/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrderDetails);

export default router;
