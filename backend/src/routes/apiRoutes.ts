// src/routes/apiRoutes.ts (no dashboard)
import { Router } from "express";
import { getProducts } from "../controllers/product/productController";

const router = Router();

// Definindo o endpoint para obter produtos
router.get("/products", getProducts);

export default router;
