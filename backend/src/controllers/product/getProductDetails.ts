import { Request, Response } from "express";
import Product from "../../models/productModel";

export const getProductDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ message: "Produto não encontrado" });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar detalhes do produto" });
  }
};
