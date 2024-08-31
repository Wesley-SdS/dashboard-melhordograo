import express from "express";
import multer from "multer";
import { createProduct } from "../controllers/product/productController";
import { getProducts } from "../controllers/product/getProduct";
import { getProductDetails } from "../controllers/product/getProductDetails";
import { updateProduct } from "../controllers/product/updateProduct";
import { deleteProduct } from "../controllers/product/deleteProduct";
import { authToken } from "../middleware/authToken";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Rotas de Produtos
router.post("/", authToken, upload.array("images"), createProduct); // Criação de produto
router.get("/", authToken, getProducts); // Listagem de produtos
router.get("/:id", authToken, getProductDetails); // Detalhes de um produto específico
router.put("/:id", authToken, upload.array("images"), updateProduct); // Atualização de um produto
router.delete("/:id", authToken, deleteProduct); // Exclusão de um produto

export default router;
