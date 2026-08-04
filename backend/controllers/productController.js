import cloudinary from "cloudinary";
import { productModel } from "../models/productModel.js";
import { json } from "express";

// Function to Add Product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    // 1️⃣ Extract uploaded files correctly (multer fields)
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    let images = [image1, image2, image3, image4].filter(Boolean);

    // 2️⃣ Validate images
    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    // 3️⃣ Upload images to Cloudinary

    const imageUrls = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return await result.secure_url;
      })
    );

    // 4️⃣ Debug logs (remove in production)
    // console.log(
    //   name,
    //   price,
    //   description,
    //   category,
    //   subCategory,
    //   sizes,
    //   bestseller
    // );
    // console.log(imageUrls);

    // 5️⃣ Success response (later → save to DB)

    const productData = {
      name,
      description,
      category,
      subCategory,
      price: Number(price),
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      image: imageUrls,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();
    return res.send({ success: true, message: "Product Added" });
  } catch (err) {
    console.error("Add product error:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Other handlers (placeholders)
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    if (products.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "Product List is Empty" });
    }

    return res.send({ success: true, products });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ success: false, message: err.message });
  }
};

// Delete
// const removeProduct = async (req, res) => {
//   try {
//     await productModel.findByIdAndDelete(req.body._id);

//     return res.send({ success: true, message: "Product Removed" });
//   } catch (err) {
//     console.log(err.message);
//     return res.status(404).json({ success: false, message: err.message });
//   }
// };

// Delete product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      message: "Product removed successfully",
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Single Product
const singleProduct = async (req, res) => {
  try {
    const { productID } = req.body;
    if (!productID)
      return res
        .status(404)
        .send({ success: false, message: "Product ID Required.." });
    // console.log(productID);
    const product = await productModel.findById(productID);

    return res.send({ success: true, product });
  } catch (err) {
    console.log(err.message);
    return res.status(404).send({ success: false, message: err.message });
  }
};

export { addProduct, removeProduct, singleProduct, listProduct };
