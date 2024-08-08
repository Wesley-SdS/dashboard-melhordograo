// src/controllers/product/getProduct.ts
import { Request, Response } from "express";
import Product from "../../models/productModel";

const getProductController = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getProductController;
