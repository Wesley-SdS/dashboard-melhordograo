import { Request, Response } from "express";
import Product from "../../models/productModel";
import { Multer } from "multer"; // Importe o tipo Multer

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Verifique o token no cabeçalho da requisição
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // Adicione logs para verificar se o token está presente
  console.log("Token recebido:", token);

  // Se o token não estiver presente, retorne um erro 401
  if (!token) {
    res.status(401).json({ message: "Token ausente!" });
    return;
  }

  console.log("Requisição recebida para criação de produto:");
  console.log("Body:", req.body);
  console.log("Files:", req.files);

  try {
    const {
      productName,
      productDescription,
      costPrice,
      sellingPrice,
      promoPrice,
      productSKU,
      gtin,
      mpn,
      ncm,
      quantity,
      availability,
      packageSize,
      weight,
      height,
      width,
      depth,
      categories,
      brand,
      productVideo
    } = req.body;

    // Tipo de arquivos carregados
    const images: string[] =
      req.files && Array.isArray(req.files)
        ? (req.files as Express.Multer.File[]).map((file) => file.path)
        : [];

    const product = new Product({
      productName,
      productDescription,
      costPrice,
      sellingPrice,
      promoPrice,
      productSKU,
      gtin,
      mpn,
      ncm,
      quantity,
      availability,
      packageSize,
      weight,
      height,
      width,
      depth,
      categories,
      brand,
      productVideo,
      productImages: images,
      creationDate: new Date(),
      modificationDate: new Date()
    });

    await product.save();

    console.log("Produto criado com sucesso:", product);
    res.status(201).json({ message: "Produto criado com sucesso!", product });
  } catch (error) {
    console.error("Erro ao criar produto:", error);

    // Verificação de tipo ou "type assertion" para acessar a message
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Erro ao criar produto", error: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Erro ao criar produto", error: "Erro desconhecido" });
    }
  }
};
