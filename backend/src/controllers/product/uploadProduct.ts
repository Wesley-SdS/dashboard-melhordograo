// src/controllers/product/uploadProduct.ts
import { Request, Response } from "express";
import Product from "../../models/productModel";

const uploadProductController = async (req: Request, res: Response) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export default uploadProductController;
