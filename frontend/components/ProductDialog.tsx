"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { EditorState } from "draft-js";
import { ArrowLeftRight, UploadIcon } from "lucide-react";
import { CategoryManager } from "./CategoryManager";
import { SeoPreview } from "./SeoPreview";

import { Product } from "@/app/types/types";
import { fetchProducts } from "@/services/ecommerce";

export interface ProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null; // Aceita Product, undefined ou null
  mode: "create" | "edit";
}

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export function ProductDialog({
  isOpen,
  onClose,
  product,
  mode
}: ProductDialogProps) {
  const [productName, setProductName] = useState("");
  const [productActivated, setProductActivated] = useState(false);
  const [productVariation, setProductVariation] = useState(false);
  const [productFeatured, setProductFeatured] = useState(false);
  const [productStatus, setProductStatus] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productVideo, setProductVideo] = useState("");
  const [costPrice, setCostPrice] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [promoPrice, setPromoPrice] = useState(0);
  const [productSKU, setProductSKU] = useState("");
  const [gtin, setGtin] = useState("");
  const [mpn, setMpn] = useState("");
  const [ncm, setNcm] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [availability, setAvailability] = useState("");
  const [packageSize, setPackageSize] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [depth, setDepth] = useState(0);
  const [category, setCategory] = useState("");
  const [tagTitle, setTagTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [productUrl, setProductUrl] = useState("");

  const [brand, setBrand] = useState("");
  const [productImages, setProductImages] = useState<string[]>([]);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const isMounted = useRef(false);

  const [creationDate, setCreationDate] = useState<string>("");
  const [modificationDate, setModificationDate] = useState<string>("");

  const formatDate = (date: Date) => {
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  useEffect(() => {
    const currentDate = new Date();
    if (!creationDate) {
      setCreationDate(formatDate(currentDate));
    }
  }, [creationDate]);

  useEffect(() => {
    if (isOpen) {
      const currentDate = new Date();
      setModificationDate(formatDate(currentDate));
    }
  }, [isOpen]);

  useEffect(() => {
    if (product && mode === "edit") {
      setProductName(product.productName || "");
      setProductActivated(product.productActivated || false);
      setProductVariation(product.productVariation || false);
      setProductFeatured(product.productFeatured || false);
      setProductStatus(product.productStatus || "");
      setProductDescription(product.productDescription || "");
      setProductVideo(product.productVideo || "");
      setCostPrice(product.costPrice || 0);
      setSellingPrice(product.sellingPrice || 0);
      setPromoPrice(product.promoPrice || 0);
      setProductSKU(product.productSKU || "");
      setGtin(product.gtin || "");
      setMpn(product.mpn || "");
      setNcm(product.ncm || "");
      setQuantity(product.quantity || 0);
      setAvailability(product.availability || "");
      setPackageSize(product.packageSize || "");
      setWeight(product.weight || 0);
      setHeight(product.height || 0);
      setWidth(product.width || 0);
      setDepth(product.depth || 0);
      setCategory(product.categories[0] || "");
      setBrand(product.brand || "");
      setTagTitle(product.seoTitle || "");
      setMetaDescription(product.seoDescription || "");
      setProductUrl(product.productUrl || "");
      // Se houver imagens do produto
      setProductImages(product.productImages || []);
    } else {
      resetForm();
    }
  }, [product, mode, isOpen]);

  const resetForm = () => {
    setProductName("");
    setProductActivated(false);
    setProductVariation(false);
    setProductFeatured(false);
    setProductStatus("");
    setProductDescription("");
    setProductVideo("");
    setCostPrice(0);
    setSellingPrice(0);
    setPromoPrice(0);
    setProductSKU("");
    setGtin("");
    setMpn("");
    setNcm("");
    setQuantity(0);
    setAvailability("");
    setPackageSize("");
    setWeight(0);
    setHeight(0);
    setWidth(0);
    setDepth(0);
    setCategory("");
    setBrand("");
    setTagTitle("");
    setMetaDescription("");
    setProductUrl("");
    setProductImages([]);
  };

  const handleEditorStateChange = (newEditorState: EditorState) => {
    if (isMounted.current) {
      setEditorState(newEditorState);
    }
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch("http://localhost:3001/upload/image", {
          method: "POST",
          body: formData
        });

        const data = await response.json();
        if (response.ok) {
          console.log("Imagem carregada com sucesso:", data.url);
        } else {
          console.error("Erro ao carregar a imagem:", data.message);
        }
      } catch (error) {
        console.error("Erro ao carregar a imagem:", error);
      }
    }
  };

  <input
    type="file"
    id="productImages"
    className="hidden"
    ref={fileInputRef}
    multiple
    onChange={handleFileChange}
  />;

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("productName", productName);
    formData.append("productActivated", String(productActivated));
    formData.append("productVariation", String(productVariation));
    formData.append("productFeatured", String(productFeatured));
    formData.append("productStatus", productStatus);
    formData.append("productDescription", productDescription);
    formData.append("productVideo", productVideo || "");
    formData.append("costPrice", String(costPrice));
    formData.append("sellingPrice", String(sellingPrice));
    formData.append("promoPrice", promoPrice ? String(promoPrice) : "");
    formData.append("productSKU", productSKU);
    formData.append("gtin", gtin || "");
    formData.append("mpn", mpn || "");
    formData.append("ncm", ncm || "");
    formData.append("quantity", String(quantity));
    formData.append("availability", availability);
    formData.append("packageSize", packageSize || "");
    formData.append("weight", weight ? String(weight) : "");
    formData.append("height", height ? String(height) : "");
    formData.append("width", width ? String(width) : "");
    formData.append("depth", depth ? String(depth) : "");
    formData.append("categories", category || ""); // Corrigido para enviar corretamente a categoria
    formData.append("brand", brand || ""); // Certifique-se de que a marca esteja sendo enviada corretamente
    formData.append("seoTitle", tagTitle || "");
    formData.append("seoDescription", metaDescription || "");
    formData.append("productUrl", productUrl || "");

    productImages.forEach((image) => {
      formData.append("images", image); // Corrigido para "images" conforme necessário pelo backend
    });

    const token = localStorage.getItem("token");
    console.log("Token armazenado:", token);

    try {
      const response = await fetch("http://localhost:3001/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}` // Inclua o token aqui
        },
        body: formData
      });

      if (response.ok) {
        console.log("Produto criado com sucesso!");
        fetchProducts();
      } else {
        console.error("Erro ao criar produto:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  const handleImageSort = () => {
    // Lógica para ordenar imagens
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button>Edit Product</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-full sm:max-w-5xl mx-auto h-full sm:h-[calc(100%-48px)] max-h-[calc(100%-48px)] p-4">
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center justify-center py-4 sm:py-10 gap-4 text-center">
            Editar Produto
          </DialogTitle>
          <p className="text-center sm:text-left">Principais Informações</p>
        </DialogHeader>

        <Card className="h-full overflow-y-auto p-4">
          <CardContent>
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="productName">Nome do Produto *</Label>
                <Input
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Ex: Camiseta Básica Feminina"
                  maxLength={40}
                />
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap justify-between space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <Switch
                      id="productActivated"
                      checked={productActivated}
                      onCheckedChange={(checked) =>
                        setProductActivated(checked)
                      }
                    />
                    <Label htmlFor="productActivated">Produto ativado?</Label>
                  </div>

                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <Switch
                      id="productVariation"
                      checked={productVariation}
                      onCheckedChange={(checked) =>
                        setProductVariation(checked)
                      }
                    />
                    <Label htmlFor="productVariation">
                      Produto com variação?
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <Switch
                      id="productFeatured"
                      checked={productFeatured}
                      onCheckedChange={(checked) => setProductFeatured(checked)}
                    />
                    <Label htmlFor="productFeatured">
                      Produto em destaque?
                    </Label>
                  </div>

                  <div className="space-y-2 w-full sm:w-auto">
                    <Label htmlFor="productStatus">Situação do produto</Label>
                    <Select
                      value={productStatus}
                      onValueChange={(value) => setProductStatus(value)}
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

                <div className="space-y-4">
                  <Label htmlFor="productDescription">
                    Descrição do Produto *
                  </Label>
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={handleEditorStateChange}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName h-96 border"
                    toolbar={{
                      options: [
                        "inline",
                        "blockType",
                        "fontSize",
                        "list",
                        "textAlign",
                        "colorPicker",
                        "link",
                        "embedded",
                        "emoji",
                        "image",
                        "remove",
                        "history"
                      ],
                      inline: { inDropdown: true },
                      list: { inDropdown: true },
                      textAlign: { inDropdown: true },
                      link: { inDropdown: true },
                      history: { inDropdown: true }
                    }}
                  />
                </div>

                <div className="flex items-center justify-end gap-2">
                  <input
                    type="file"
                    id="productImages"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  <Button
                    variant="outline"
                    className="border-none hover:bg-transparent hover:text-stone-400 flex items-center"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <UploadIcon className="mr-2" /> Escolher imagens
                  </Button>
                  <Button
                    variant="outline"
                    className="border-none hover:bg-transparent hover:text-stone-400 flex items-center"
                    onClick={handleImageSort}
                  >
                    <ArrowLeftRight className="mr-2" />
                    Ordenar imagens
                  </Button>
                </div>

                <div>
                  <Label htmlFor="productVideo">Vídeo do produto</Label>
                  <Input
                    id="productVideo"
                    value={productVideo}
                    onChange={(e) => setProductVideo(e.target.value)}
                    placeholder="URL do vídeo"
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-between space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
                  <div className="flex flex-col space-y-2 w-full sm:w-1/3">
                    <Label htmlFor="costPrice">Preço de custo</Label>
                    <Input
                      id="costPrice"
                      type="number"
                      value={costPrice}
                      onChange={(e) => setCostPrice(Number(e.target.value))}
                      placeholder="R$"
                    />
                  </div>

                  <div className="flex flex-col space-y-2 w-full sm:w-1/3">
                    <Label htmlFor="sellingPrice">Preço de venda *</Label>
                    <Input
                      id="sellingPrice"
                      type="number"
                      value={sellingPrice}
                      onChange={(e) => setSellingPrice(Number(e.target.value))}
                      placeholder="R$"
                      required
                    />
                  </div>

                  <div className="flex flex-col space-y-2 w-full sm:w-1/3">
                    <Label htmlFor="promoPrice">Preço promocional</Label>
                    <Input
                      id="promoPrice"
                      type="number"
                      value={promoPrice}
                      onChange={(e) => setPromoPrice(Number(e.target.value))}
                      placeholder="R$"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
                  <div className="flex flex-col space-y-2 w-full sm:w-1/4">
                    <Label htmlFor="productSKU">SKU *</Label>
                    <Input
                      id="productSKU"
                      value={productSKU}
                      onChange={(e) => setProductSKU(e.target.value)}
                      placeholder="SKU"
                      required
                    />
                  </div>

                  <div className="flex flex-col space-y-2 w-full sm:w-1/4">
                    <Label htmlFor="gtin">GTIN</Label>
                    <Input
                      id="gtin"
                      value={gtin}
                      onChange={(e) => setGtin(e.target.value)}
                      placeholder="GTIN"
                    />
                  </div>
                  <div className="flex flex-col space-y-2 w-full sm:w-1/4">
                    <Label htmlFor="mpn">MPN</Label>
                    <Input
                      id="mpn"
                      value={mpn}
                      onChange={(e) => setMpn(e.target.value)}
                      placeholder="MPN"
                    />
                  </div>
                  <div className="flex flex-col space-y-2 w-full sm:w-1/4">
                    <Label htmlFor="ncm">NCM</Label>
                    <Input
                      id="ncm"
                      value={ncm}
                      onChange={(e) => setNcm(e.target.value)}
                      placeholder="NCM"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 justify-between space-y-4 sm:space-y-0">
                  <div className="flex flex-col space-y-2 w-full sm:w-1/2">
                    <Label htmlFor="quantity">Quantidade</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      placeholder="Quantidade"
                    />
                  </div>
                  <div className="flex flex-col space-y-2 w-full sm:w-1/2">
                    <Label htmlFor="availability">Disponibilidade</Label>
                    <Select
                      value={availability}
                      onValueChange={(value) => setAvailability(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disponível">Disponível</SelectItem>
                        <SelectItem value="indisponível">
                          Indisponível
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="text-muted-foreground mt-2">
                  <p>
                    0 unidades deste produto estão reservadas, restando 0
                    disponíveis para venda.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 justify-between space-y-4 sm:space-y-0">
                  <div className="flex flex-col space-y-2 w-full sm:w-1/3">
                    <Label htmlFor="packageSize">Tamanho da embalagem</Label>
                    <Input
                      id="packageSize"
                      value={packageSize}
                      onChange={(e) => setPackageSize(e.target.value)}
                      placeholder="Ex: 10x10x10 cm"
                    />
                  </div>

                  <div className="flex flex-col space-y-2 w-full sm:w-1/3">
                    <Label htmlFor="weight">Peso</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      placeholder="Peso em gramas"
                    />
                  </div>

                  <div className="flex flex-col space-y-2 w-full sm:w-1/3">
                    <Label htmlFor="dimensions">Dimensões</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="height"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        placeholder="Altura"
                      />
                      <Input
                        id="width"
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(Number(e.target.value))}
                        placeholder="Largura"
                      />
                      <Input
                        id="depth"
                        type="number"
                        value={depth}
                        onChange={(e) => setDepth(Number(e.target.value))}
                        placeholder="Profundidade"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categories">Categorias</Label>
                  <Select
                    value={category}
                    onValueChange={(value) => setCategory(value)}
                  >
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Adicione suas opções de categorias aqui */}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Marca</Label>
                  <Input
                    id="brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Marca"
                  />
                </div>

                <div className="">
                  <SeoPreview
                    tagTitle={tagTitle}
                    setTagTitle={setTagTitle}
                    metaDescription={metaDescription}
                    setMetaDescription={setMetaDescription}
                    productUrl={productUrl}
                    setProductUrl={setProductUrl}
                  />
                </div>
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button type="button" onClick={handleSubmit}>
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
