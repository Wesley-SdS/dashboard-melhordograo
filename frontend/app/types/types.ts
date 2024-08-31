export interface Product {
  _id: string;

  productName: string;
  productActivated: boolean;
  productVariation: boolean;
  productFeatured: boolean;
  productStatus: "novo" | "usado";
  productDescription: string;
  productImages: string[];
  productVideo: string; // Não opcional
  costPrice: number;
  sellingPrice: number;
  promoPrice?: number;
  productSKU: string;
  gtin?: string;
  mpn?: string;
  ncm?: string;
  quantity: number;
  reservedQuantity: number;

  availability: "disponível" | "indisponível";
  packageSize?: string;
  weight?: number;
  height?: number;
  width?: number;
  depth?: number;
  categories: string[];
  brand: string;
  seoTitle: string;
  seoDescription: string;
  productUrl: string;
  creationDate: Date;
  modificationDate: Date;
}
