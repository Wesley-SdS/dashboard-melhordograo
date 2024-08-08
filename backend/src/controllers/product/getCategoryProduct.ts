// src/controllers/product/getCategoryProduct.ts
import { Request, Response } from "express";
import Product from "../../models/productModel";

const getCategoryProduct = async (req: Request, res: Response) => {
  const { category } = req.params;

  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getCategoryProduct;
