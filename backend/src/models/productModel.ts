import mongoose, { Schema, Document, Model } from "mongoose";

interface IProduct extends Document {
  productName: string;
  productActivated: boolean;
  productVariation: boolean;
  productFeatured: boolean;
  productStatus: string;
  productDescription: string;
  productImages: string[];
  productVideo: string;
  costPrice: number;
  sellingPrice: number;
  promoPrice?: number;
  productSKU: string;
  gtin?: string;
  mpn?: string;
  ncm?: string;
  quantity: number;
  availability: string;
  reservedQuantity: number;
  packageSize?: string;
  weight?: number;
  height?: number;
  width?: number;
  depth?: number;
  categories: string[];
  brand: string;
  seoTitle: string;
  seoDescription: string;
  creationDate: Date;
  modificationDate: Date;
}

const ProductSchema: Schema = new Schema({
  productName: { type: String, required: true, maxLength: 40 },
  productActivated: { type: Boolean, default: false },
  productVariation: { type: Boolean, default: false },
  productFeatured: { type: Boolean, default: false },
  productStatus: { type: String, enum: ["novo", "usado"], default: "novo" },
  productDescription: { type: String, required: true },
  productImages: { type: [String], default: [] },
  productVideo: { type: String },
  costPrice: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  promoPrice: { type: Number },
  productSKU: { type: String, required: true },
  gtin: { type: String },
  mpn: { type: String },
  ncm: { type: String },
  quantity: { type: Number, required: true },
  availability: {
    type: String,
    enum: ["immediate", "whenOutOfStock", "unavailable"],
    default: "immediate"
  },
  reservedQuantity: { type: Number, default: 0 },
  packageSize: { type: String },
  weight: { type: Number },
  height: { type: Number },
  width: { type: Number },
  depth: { type: Number },
  categories: { type: [String], default: [] },
  brand: { type: String },
  seoTitle: { type: String },
  seoDescription: { type: String },
  creationDate: { type: Date, default: Date.now },
  modificationDate: { type: Date, default: Date.now }
});

// Middleware para atualizar modificationDate
ProductSchema.pre("save", function (next) {
  if (this.isModified()) {
    this.modificationDate = new Date();
  }
  next();
});

const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  ProductSchema
);

export default Product;
