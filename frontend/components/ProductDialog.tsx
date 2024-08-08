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

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

interface ProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDialog({ isOpen, onClose }: ProductDialogProps) {
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
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleEditorStateChange = (newEditorState: EditorState) => {
    if (isMounted.current) {
      setEditorState(newEditorState);
    }
  };
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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
                  placeholder="Ex: Camiseta Básica Feminina"
                  maxLength={40}
                />
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap justify-between space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <Switch id="productActivated" />
                    <Label htmlFor="productActivated">Produto ativado?</Label>
                  </div>

                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <Switch id="productVariation" />
                    <Label htmlFor="productVariation">
                      Produto com variação?
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <Switch id="productFeatured" />
                    <Label htmlFor="productFeatured">
                      Produto em destaque?
                    </Label>
                  </div>

                  <div className="space-y-2 w-full sm:w-auto">
                    <Label htmlFor="productStatus">Situação do produto</Label>
                    <Select>
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
                  />
                  <Button
                    variant="outline"
                    className="border-none hover:bg-transparent hover:text-stone-400 flex items-center"
                    onClick={handleClick}
                  >
                    <UploadIcon className="mr-2" /> Escolher imagens
                  </Button>
                  <Button
                    variant="outline"
                    className="border-none hover:bg-transparent hover:text-stone-400 flex items-center"
                  >
                    <ArrowLeftRight className="mr-2" />
                    Ordenar imagens
                  </Button>
                </div>

                <div>
                  <Label htmlFor="productVideo">Vídeo do produto</Label>
                  <Input id="productVideo" placeholder="URL do vídeo" />
                </div>

                <div className="flex flex-col sm:flex-row justify-between space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
                  <div className="flex flex-col space-y-2 w-full sm:w-1/3">
                    <Label htmlFor="costPrice">Preço de custo</Label>
                    <Input id="costPrice" type="number" placeholder="R$" />
                  </div>

                  <div className="flex flex-col space-y-2 w-full sm:w-1/3">
                    <Label htmlFor="sellingPrice">Preço de venda *</Label>
                    <Input
                      id="sellingPrice"
                      type="number"
                      placeholder="R$"
                      required
                    />
                  </div>

                  <div className="flex flex-col space-y-2 w-full sm:w-1/3">
                    <Label htmlFor="promoPrice">Preço promocional</Label>
                    <Input id="promoPrice" type="number" placeholder="R$" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
                  <div className="flex flex-col space-y-2 w-full sm:w-1/4">
                    <Label htmlFor="productSKU">SKU *</Label>
                    <Input id="productSKU" placeholder="SKU" required />
                  </div>

                  <div className="flex flex-col space-y-2 w-full sm:w-1/4">
                    <Label htmlFor="gtin">GTIN</Label>
                    <Input id="gtin" placeholder="GTIN" />
                  </div>
                  <div className="flex flex-col space-y-2 w-full sm:w-1/4">
                    <Label htmlFor="mpn">MPN</Label>
                    <Input id="mpn" placeholder="MPN" />
                  </div>
                  <div className="flex flex-col space-y-2 w-full sm:w-1/4">
                    <Label htmlFor="ncm">NCM</Label>
                    <Input id="ncm" placeholder="NCM" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 justify-between space-y-4 sm:space-y-0">
                  <div className="flex flex-col space-y-2 w-full sm:w-1/2">
                    <Label htmlFor="quantity">Quantidade</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="Quantidade"
                    />
                  </div>
                  <div className="flex flex-col space-y-2 w-full sm:w-1/2">
                    <Label htmlFor="availability">Disponibilidade</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">
                          Disponibilidade imediata
                        </SelectItem>
                        <SelectItem value="whenOutOfStock">
                          Quando acabar o estoque
                        </SelectItem>
                        <SelectItem value="unavailable">
                          Tornar o produto indisponível
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="text-muted-foreground mt-2">
                  <p>
                    0 unidades deste produto estão reservadas, restando 0 para
                    venda.
                  </p>
                </div>

                <div>
                  <Label htmlFor="packageSize">
                    Qual é o tamanho da embalagem do produto?
                  </Label>
                  <Input id="packageSize" placeholder="Ex: 30x20x20" />
                </div>
                <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 justify-between space-y-4 sm:space-y-0">
                  <div className="flex flex-col space-y-2 w-full sm:w-1/4">
                    <Label htmlFor="weight">Peso</Label>
                    <Input id="weight" type="number" placeholder="Kg" />
                  </div>

                  <div className="flex flex-col space-y-2 w-full sm:w-1/4">
                    <Label htmlFor="height">Altura</Label>
                    <Input id="height" type="number" placeholder="cm" />
                  </div>

                  <div className="flex flex-col space-y-2 w-full sm:w-1/4">
                    <Label htmlFor="width">Largura</Label>
                    <Input id="width" type="number" placeholder="cm" />
                  </div>

                  <div className="flex flex-col space-y-2 w-full sm:w-1/4">
                    <Label htmlFor="depth">Profundidade</Label>
                    <Input id="depth" type="number" placeholder="cm" />
                  </div>
                </div>

                <div>
                  <CategoryManager />
                </div>

                <div>
                  <Label htmlFor="availability">Marca</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Ceres Brasil</SelectItem>
                      <SelectItem value="whenOutOfStock">Origens</SelectItem>
                      <SelectItem value="unavailable">Bold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="">
                  <SeoPreview />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-4 sm:space-y-0 space-x-0 sm:space-x-4">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-4">
              <Label>Data de criação:</Label>
              <p>{creationDate}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Label>Data de modificação:</Label>
              <p>{modificationDate}</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <Button className="py-5 px-10 bg-stone-600" onClick={onClose}>
              Salvar
            </Button>
            <Button className="py-5 px-10 bg-stone-600" onClick={onClose}>
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
