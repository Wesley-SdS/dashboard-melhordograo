// src/controllers/product/searchProduct.ts
import { Request, Response } from "express";
import Product from "../../models/productModel";

const searchProduct = async (req: Request, res: Response) => {
  const { query } = req.params;

  try {
    const products = await Product.find({
      $text: { $search: query }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default searchProduct;
