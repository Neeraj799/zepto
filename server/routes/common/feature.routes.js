import express from "express";
import {
  addFeatureImage,
  getFeatureImage,
} from "../../controller/admin/feature.controller.js";

const router = express.Router();

router.get("/get", getFeatureImage);
router.post("/add", addFeatureImage);

export default router;
