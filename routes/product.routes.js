import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/products", getProducts);
router.post("/products", upload.single("file"), createProduct)
router.put("/products/:id", upload.single("file"), updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;