import { Request, Response } from "express";
import Product from "../../models/productModel";
import { isValidObjectId } from "mongoose";

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productId = req.params.id;

    if (!isValidObjectId(productId)) {
      res.status(400).json({ message: "ID do produto inválido" });
      return;
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      res.status(404).json({ message: "Produto não encontrado" });
      return;
    }

    res.status(200).json({ message: "Produto deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar produto" });
  }
};
