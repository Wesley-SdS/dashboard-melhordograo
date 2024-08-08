// src/controllers/product/filterProduct.ts
import { Request, Response } from "express";
import Product from "../../models/productModel";

const filterProductController = async (req: Request, res: Response) => {
  const filters = req.body;

  try {
    const products = await Product.find(filters);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default filterProductController;
