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

router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file)
    return res.status(400).json({ message: "No file uploaded" });

  const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  res.json({ url });
});


export default router;