import express from "express";
import {
  addAddress,
  deleteAddress,
  fetchAllAddress,
  updateAddress,
} from "../../controller/user/address.controller.js";

const router = express.Router();

router.post("/add", addAddress);
router.get("/get/:userId", fetchAllAddress);
router.patch("/update/:userId/:addressId", updateAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);

export default router;
