import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();

connectDB();

const corsOptions = {
  origin: ["https://hataoo.in", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api", productRoutes);

const PORT = process.env.PORT || 5006;

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);