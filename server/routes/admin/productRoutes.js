import express from "express";
import { upload } from "../../config/cloudinary.js";
import {
  addProduct,
  deleteProduct,
  fetchAllProducts,
  handleImageUpload,
  updateProduct,
} from "../../controller/admin/product.controller.js";

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.get("/getProduct", fetchAllProducts);
router.post("/addProduct", addProduct);
router.patch("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

export default router;
