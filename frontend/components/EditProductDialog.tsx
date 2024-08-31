import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Product } from "@/app/types/types";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftRight, UploadIcon } from "lucide-react";
import { SeoPreview } from "./SeoPreview";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchProducts } from "@/services/ecommerce";

interface EditProductDialogProps {
  product: Product | undefined;
  open: boolean;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({
  product,
  open,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<Product>(
    product || {
      _id: "",
      productName: "",
      productActivated: false,
      productVariation: false,
      productFeatured: false,
      productStatus: "novo",
      productDescription: "",
      productImages: [],
      productVideo: "",
      costPrice: 0,
      sellingPrice: 0,
      promoPrice: undefined,
      productSKU: "",
      gtin: "",
      mpn: "",
      ncm: "",
      quantity: 0,
      availability: "disponível", // Valor padrão atualizado
      reservedQuantity: 0,
      packageSize: "",
      weight: 0,
      height: 0,
      width: 0,
      depth: 0,
      categories: [],
      brand: "",
      seoTitle: "",
      seoDescription: "",
      productUrl: "",
      creationDate: new Date(),
      modificationDate: new Date()
    }
  );
  const [tagTitle, setTagTitle] = useState(formData.seoTitle);
  const [metaDescription, setMetaDescription] = useState(
    formData.seoDescription
  );
  const [productUrl, setProductUrl] = useState("");

  const token = localStorage.getItem("token"); // Obtém o token armazenado

  const updateProduct = async (updatedProduct: Product) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/products/${updatedProduct._id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}` // Inclui o token JWT no cabeçalho
          }
        }
      );
      toast.success("Product updated successfully!");
      onClose(); // Fecha o diálogo
      onSave(updatedProduct);
      return response.data;
    } catch (error) {
      toast.error("Failed to update product.");
      console.error("Failed to update product:", error);
      throw error;
    }
  };

  const handleSave = async () => {
    const updatedProduct: Product = {
      ...formData,
      seoTitle: tagTitle,
      seoDescription: metaDescription,
      productUrl: productUrl
    };

    try {
      await updateProduct(updatedProduct);
    } catch (error) {
      console.error("Error during save operation:", error);
    }
  };

  const handleSeoDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMetaDescription(e.target.value);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-lg overflow-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit Product
          </DialogTitle>
        </DialogHeader>

        <div className="mb-4">
          <Label htmlFor="productName">Product Name</Label>
          <Input
            id="productName"
            value={formData.productName}
            onChange={(e) =>
              setFormData({ ...formData, productName: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="productActivated"
              checked={formData.productActivated}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, productActivated: checked })
              }
            />
            <Label htmlFor="productActivated">Produto ativado?</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="productVariation"
              checked={formData.productVariation}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, productVariation: checked })
              }
            />
            <Label htmlFor="productVariation">Produto com variação?</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="productFeatured"
              checked={formData.productFeatured}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, productFeatured: checked })
              }
            />
            <Label htmlFor="productFeatured">Produto em destaque?</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="productStatus">Situação do produto</Label>
            <Select
              value={formData.productStatus}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  productStatus: value as "novo" | "usado"
                })
              }
            >
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="novo">Novo</SelectItem>
                <SelectItem value="usado">Usado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-4">
          <Label htmlFor="productDescription">Product Description</Label>
          <Textarea
            value={formData.productDescription}
            onChange={(e) =>
              setFormData({ ...formData, productDescription: e.target.value })
            }
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <input
            type="file"
            id="productImages"
            className="hidden"
            onChange={(e) => {
              // Handle image upload
            }}
          />
          <Button
            variant="outline"
            className="border-none hover:bg-transparent hover:text-stone-400 flex items-center"
            onClick={() => {
              // Trigger file input click
            }}
          >
            <UploadIcon className="mr-2" /> Escolher imagens
          </Button>
          <Button
            variant="outline"
            className="border-none hover:bg-transparent hover:text-stone-400 flex items-center"
            onClick={() => {
              // Handle image sorting
            }}
          >
            <ArrowLeftRight className="mr-2" />
            Ordenar imagens
          </Button>
        </div>

        <div className="mb-4">
          <Label htmlFor="productVideo">Vídeo do produto</Label>
          <Input
            id="productVideo"
            value={formData.productVideo}
            onChange={(e) =>
              setFormData({ ...formData, productVideo: e.target.value })
            }
            placeholder="URL do vídeo"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col space-y-2 w-full sm:w-1/3">
            <Label htmlFor="costPrice">Preço de custo</Label>
            <Input
              id="costPrice"
              type="number"
              value={formData.costPrice}
              onChange={(e) =>
                setFormData({ ...formData, costPrice: +e.target.value })
              }
              placeholder="R$"
            />
          </div>

          <div className="flex flex-col space-y-2 w-full sm:w-1/3">
            <Label htmlFor="sellingPrice">Preço de venda *</Label>
            <Input
              id="sellingPrice"
              type="number"
              value={formData.sellingPrice}
              onChange={(e) =>
                setFormData({ ...formData, sellingPrice: +e.target.value })
              }
              placeholder="R$"
              required
            />
          </div>

          <div className="flex flex-col space-y-2 w-full sm:w-1/3">
            <Label htmlFor="promoPrice">Preço promocional</Label>
            <Input
              id="promoPrice"
              type="number"
              value={formData.promoPrice || ""}
              onChange={(e) =>
                setFormData({ ...formData, promoPrice: +e.target.value })
              }
              placeholder="R$"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col space-y-2 w-full sm:w-1/4">
            <Label htmlFor="productSKU">SKU *</Label>
            <Input
              id="productSKU"
              value={formData.productSKU}
              onChange={(e) =>
                setFormData({ ...formData, productSKU: e.target.value })
              }
              placeholder="SKU"
              required
            />
          </div>

          <div className="flex flex-col space-y-2 w-full sm:w-1/4">
            <Label htmlFor="gtin">GTIN</Label>
            <Input
              id="gtin"
              value={formData.gtin}
              onChange={(e) =>
                setFormData({ ...formData, gtin: e.target.value })
              }
              placeholder="GTIN"
            />
          </div>

          <div className="flex flex-col space-y-2 w-full sm:w-1/4">
            <Label htmlFor="mpn">MPN</Label>
            <Input
              id="mpn"
              value={formData.mpn}
              onChange={(e) =>
                setFormData({ ...formData, mpn: e.target.value })
              }
              placeholder="MPN"
            />
          </div>

          <div className="flex flex-col space-y-2 w-full sm:w-1/4">
            <Label htmlFor="ncm">NCM</Label>
            <Input
              id="ncm"
              value={formData.ncm}
              onChange={(e) =>
                setFormData({ ...formData, ncm: e.target.value })
              }
              placeholder="NCM"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col space-y-2 w-full sm:w-1/4">
            <Label htmlFor="quantity">Quantidade *</Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: +e.target.value })
              }
              placeholder="Quantidade"
              required
            />
          </div>

          <div className="flex flex-col space-y-2 w-full sm:w-1/4">
            <Label htmlFor="availability">Disponibilidade</Label>
            <Select
              value={formData.availability}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  availability: value as "disponível" | "indisponível"
                })
              }
            >
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="disponível">Disponível</SelectItem>
                <SelectItem value="indisponível">Indisponível</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col space-y-2 w-full sm:w-1/4">
            <Label htmlFor="reservedQuantity">Quantidade reservada</Label>
            <Input
              id="reservedQuantity"
              type="number"
              value={formData.reservedQuantity}
              onChange={(e) =>
                setFormData({ ...formData, reservedQuantity: +e.target.value })
              }
              placeholder="Reservada"
            />
          </div>

          <div className="flex flex-col space-y-2 w-full sm:w-1/4">
            <Label htmlFor="packageSize">Tamanho do pacote</Label>
            <Input
              id="packageSize"
              value={formData.packageSize}
              onChange={(e) =>
                setFormData({ ...formData, packageSize: e.target.value })
              }
              placeholder="Tamanho"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col space-y-2 w-full sm:w-1/4">
            <Label htmlFor="weight">Peso (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={formData.weight}
              onChange={(e) =>
                setFormData({ ...formData, weight: +e.target.value })
              }
              placeholder="Peso"
            />
          </div>

          <div className="flex flex-col space-y-2 w-full sm:w-1/4">
            <Label htmlFor="height">Altura (cm)</Label>
            <Input
              id="height"
              type="number"
              value={formData.height}
              onChange={(e) =>
                setFormData({ ...formData, height: +e.target.value })
              }
              placeholder="Altura"
            />
          </div>

          <div className="flex flex-col space-y-2 w-full sm:w-1/4">
            <Label htmlFor="width">Largura (cm)</Label>
            <Input
              id="width"
              type="number"
              value={formData.width}
              onChange={(e) =>
                setFormData({ ...formData, width: +e.target.value })
              }
              placeholder="Largura"
            />
          </div>

          <div className="flex flex-col space-y-2 w-full sm:w-1/4">
            <Label htmlFor="depth">Profundidade (cm)</Label>
            <Input
              id="depth"
              type="number"
              value={formData.depth}
              onChange={(e) =>
                setFormData({ ...formData, depth: +e.target.value })
              }
              placeholder="Profundidade"
            />
          </div>
        </div>

        <div className="mb-4">
          <Label htmlFor="categories">Categorias</Label>
          <Input
            id="categories"
            value={formData.categories.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                categories: e.target.value.split(", ")
              })
            }
            placeholder="Categorias"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="brand">Marca</Label>
          <Input
            id="brand"
            value={formData.brand}
            onChange={(e) =>
              setFormData({ ...formData, brand: e.target.value })
            }
            placeholder="Marca"
          />
        </div>
        <div className="">
          <div className="mb-4">
            <Label htmlFor="seoTitle">Título SEO</Label>
            <Input
              id="seoTitle"
              value={formData.seoTitle}
              onChange={(e) =>
                setFormData({ ...formData, seoTitle: e.target.value })
              }
              placeholder="Título SEO"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="seoDescription">Descrição SEO</Label>
            <Textarea
              id="seoDescription"
              value={formData.seoDescription}
              onChange={(e) =>
                setFormData({ ...formData, seoDescription: e.target.value })
              }
              placeholder="Descrição SEO"
            />
          </div>
          <SeoPreview
            tagTitle={tagTitle}
            setTagTitle={setTagTitle}
            metaDescription={metaDescription}
            setMetaDescription={setMetaDescription}
            productUrl={productUrl}
            setProductUrl={setProductUrl}
          />
        </div>

        <DialogFooter>
          <Button type="button" onClick={onClose} variant="outline">
            Cancelar
          </Button>
          <Button type="button" onClick={handleSave}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
function closeDialog() {
  throw new Error("Function not implemented.");
}
