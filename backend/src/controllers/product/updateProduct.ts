import { Request, Response } from "express";
import Product from "../../models/productModel";

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productId = req.params.id;

    // Validação do ID do produto
    if (!productId) {
      res.status(400).json({ message: "ID do produto é necessário" });
      return;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true, runValidators: true } 
    );

    if (!updatedProduct) {
      res.status(404).json({ message: "Produto não encontrado" });
      return;
    }

    res
      .status(200)
      .json({ message: "Produto atualizado com sucesso", updatedProduct });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ message: "Erro ao atualizar produto" });
  }
};
