import { Request, Response } from "express";
import Product from "../../models/productModel";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Pega os parâmetros da query
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const skip = (page - 1) * limit;

    // Busca os produtos com paginação
    const products = await Product.find().skip(skip).limit(limit);
    const total = await Product.countDocuments();

    // Retorna os produtos e o total de produtos
    res.status(200).json({ products, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar produtos" });
  }
};
