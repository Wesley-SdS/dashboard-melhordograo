// src/controllers/product/getCategoryWiseProduct.ts
import { Request, Response } from "express";
import Product from "../../models/productModel";

const getCategoryWiseProduct = async (req: Request, res: Response) => {
  try {
    const products = await Product.aggregate([
      { $group: { _id: "$category", products: { $push: "$$ROOT" } } }
    ]);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getCategoryWiseProduct;
