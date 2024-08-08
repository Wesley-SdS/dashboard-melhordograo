"use client";

import { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function SeoPreview() {
  const [tagTitle, setTagTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [productUrl, setProductUrl] = useState("");

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTagTitle(e.target.value);
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setMetaDescription(e.target.value);
  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) =>
    setProductUrl(e.target.value);

  return (
    <div className="flex space-x-4 p-4 border rounded-lg">
      <div className="w-1/2 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="tagTitle">Tag Title</Label>
          <Input
            id="tagTitle"
            placeholder="Ex. Camiseta Básica Feminina"
            value={tagTitle}
            onChange={handleTitleChange}
          />
          <span className="text-gray-700 text-sm">
            {tagTitle.length} de 70 caracteres
          </span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="metaDescription">Meta Tag Description</Label>
          <Textarea
            id="metaDescription"
            placeholder="Ex. Esta camisa é uma peça ideal para compor looks relaxados ou sofisticados"
            value={metaDescription}
            onChange={handleDescriptionChange}
          />
          <span className="text-gray-700 text-sm">
            {metaDescription.length} de 250 caracteres
          </span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="productUrl">URL do produto</Label>
          <Input
            id="productUrl"
            placeholder="https://www.seusite.com.br/produto-exemplo"
            value={productUrl}
            onChange={handleUrlChange}
          />
        </div>
      </div>

      <div className="w-1/2 mt-6 p-4 border rounded-lg">
        <h3 className="text-lg font-bold">Pré-visualização</h3>
        <div className="mt-2">
          <p className="text-xl text-green-700">
            {tagTitle || "Nome do produto"}
          </p>
          <p className="text-gray-600">
            {productUrl || "https://www.seusite.com.br/produto-exemplo"}
          </p>
          <p className="text-gray-700">
            {metaDescription || "Descrição do produto aparecerá aqui."}
          </p>
        </div>
      </div>
    </div>
  );
}
