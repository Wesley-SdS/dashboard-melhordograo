// src/controllers/product/getAllCategories.ts
import { Request, Response } from "express";
import Category from "../../models/category";

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getAllCategories;
