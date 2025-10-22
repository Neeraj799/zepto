import express from "express";
import {
  addFeatureImage,
  deleteFeatureImage,
  getFeatureImage,
} from "../../controller/admin/feature.controller.js";

const router = express.Router();

router.get("/get", getFeatureImage);
router.post("/add", addFeatureImage);
router.delete("/delete/:id", deleteFeatureImage);

export default router;
