import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import envConfig from "./config/envConfig.js";

import adminProductsRoutes from "../server/routes/admin/productRoutes.js";
import adminOrderRoutes from "../server/routes/admin/order.routes.js";

import userRoutes from "../server/routes/user/auth.routes.js";
import userProductsRoutes from "../server/routes/user/product.routes.js";
import userCartRoutes from "../server/routes/user/cart.routes.js";
import addressUserRoutes from "../server/routes/user/address.routes.js";
import userOrderRoutes from "../server/routes/user/order.routes.js";
import userSearchRoutes from "../server/routes/user/search.routes.js";
import userReviewRoutes from "../server/routes/user/review.routes.js";

import commonFeautreRoutes from "../server/routes/common/feature.routes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(envConfig.db.URL)
  .then(() => {
    console.log("Mongoose connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });

const PORT = envConfig.general.PORT || 4800;

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/user", userRoutes);
app.use("/api/admin/products", adminProductsRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

app.use("/api/user/products", userProductsRoutes);
app.use("/api/user/cart", userCartRoutes);
app.use("/api/user/address", addressUserRoutes);
app.use("/api/user/order", userOrderRoutes);
app.use("/api/user/search", userSearchRoutes);
app.use("/api/user/review", userReviewRoutes);

app.use("/api/common/feature", commonFeautreRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
