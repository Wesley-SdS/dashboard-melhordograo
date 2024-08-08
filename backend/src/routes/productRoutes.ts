import { Router } from "express";
import uploadProductController from "../controllers/product/uploadProduct";
import getProductController from "../controllers/product/getProduct";
import updateProductController from "../controllers/product/updateProduct";
import getCategoryProduct from "../controllers/product/getCategoryProduct";
import getCategoryWiseProduct from "../controllers/product/getCategoryWiseProduct";
import getProductDetails from "../controllers/product/getProductDetails";
import searchProduct from "../controllers/product/searchProduct";
import filterProductController from "../controllers/product/filterProduct";
import getAllCategories from "../controllers/product/getAllCategories";

const router = Router();

// Definindo as rotas
router.post("/upload", uploadProductController);
router.get("/get", getProductController);
router.post("/update", updateProductController);
router.get("/category", getCategoryProduct);
router.post("/category-wise", getCategoryWiseProduct);
router.post("/details", getProductDetails);
router.get("/search", searchProduct);
router.post("/filter", filterProductController);
router.get("/categories", getAllCategories);

export default router;
