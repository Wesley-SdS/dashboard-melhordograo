// src/controllers/product/updateProduct.ts
import { Request, Response } from "express";
import Product from "../../models/productModel";

const updateProductController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export default updateProductController;
