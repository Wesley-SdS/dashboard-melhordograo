import express from "express";
import multer from "multer";
import { createProduct } from "../controllers/product/createProduct";
import { getProducts } from "../controllers/product/getProduct";
import { getProductDetails } from "../controllers/product/getProductDetails";
import { updateProduct } from "../controllers/product/updateProduct";
import { deleteProduct } from "../controllers/product/deleteProduct";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Rotas de Produtos
router.post("/products", upload.array("images"), createProduct);
router.get("/products", getProducts);
router.get("/products/:id", getProductDetails);
router.put("/products/:id", upload.array("images"), updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
