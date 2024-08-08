// src/routes/categoryRoutes.ts
import express, { Request, Response } from "express";
import Category from "../models/category";

const router = express.Router();

// Obter todas as categorias
router.get("/categories", async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
});

// Criar uma nova categoria
router.post("/categories", async (req: Request, res: Response) => {
  const { name, status } = req.body;
  const category = new Category({ name, status });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
});

export default router;
