// src/controllers/product/getProductDetails.ts
import { Request, Response } from "express";
import Product from "../../models/productModel";

const getProductDetails = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getProductDetails;
