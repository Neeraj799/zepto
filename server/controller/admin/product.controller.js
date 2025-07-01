import { imageUploadUtil } from "../../config/cloudinary.js";
import Product from "../../models/product.js";

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;
    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    const product = await newProduct.save();

    return res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: true, message: "Internal Server Error" });
  }
};

const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});

    return res.json({ success: true, data: listOfProducts });
  } catch (error) {
    console.log(error);
    return res.json({ success: true, messgae: "Internal Server Error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res.json({ success: false, message: "Product not found!" });
    }

    product.title = title || product.title;
    product.description = description || product.description;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.price = price === "" ? 0 : price || product.price;
    product.salePrice = salePrice === "" ? 0 : salePrice || product.salePrice;
    product.totalStock = totalStock || product.totalStock;
    product.image = image || product.image;

    await product.save();

    return res.status(200).json({
      success: true,
      data: product,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: true, messgae: "Internal Server Error" });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("data", id);

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: true, messgae: "Internal Server Error" });
  }
};

export {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  updateProduct,
  deleteProduct,
};
