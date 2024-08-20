import { Request, Response } from "express";
import Product from "../../models/productModel";

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("Requisição recebida");
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
    res.status(201).json({ message: "Produto criado com sucesso!", product });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ message: "Erro ao criar produto" });
  }
};
