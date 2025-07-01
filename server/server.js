import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import envConfig from "./config/envConfig.js";
import userRoutes from "../server/routes/user/auth.routes.js";
import adminProductsRoutes from "../server/routes/admin/productRoutes.js";
import userProductsRoutes from "../server/routes/user/product.routes.js";

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
app.use("/api/user/products", userProductsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
