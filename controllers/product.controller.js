import { deleteFromS3 } from "../middleware/upload.js";
import { Product } from "../model/Product.js";
import { sendResponse } from "../utils/response.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    sendResponse(res, 200, true, "Products fetched", products);
  } catch (error) {
    sendResponse(res, 500, false, error.message);
  }
};

export const createProduct = async (req, res) => {
  try {
    const creates = { ...req.body };

    if (req.file) {
      creates.image_url = req.file.location;
    }

    const product = await Product.create(creates);

    sendResponse(res, 201, true, "Product created", product);
  } catch (error) {
    sendResponse(res, 400, false, error.message);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updates = { ...req.body };

    const existingProduct = await Product.findById(req.params.id);

    if (!existingProduct)
      return sendResponse(res, 404, false, "Product not found");

    if (req.file) {
      updates.image_url = req.file.location;

      if (existingProduct.image_url) {
        await deleteFromS3(existingProduct.image_url);
      }
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    sendResponse(res, 200, true, "Product updated", product);
  } catch (error) {
    sendResponse(res, 400, false, error.message);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return sendResponse(res, 404, false, "Product not found");

    // Delete image from S3
    if (product.image_url) {
      await deleteFromS3(product.image_url);
    }

    await Product.findByIdAndDelete(req.params.id);

    sendResponse(res, 200, true, "Product deleted");
  } catch (error) {
    sendResponse(res, 400, false, error.message);
  }
};