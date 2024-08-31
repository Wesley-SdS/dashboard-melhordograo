import { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface SeoPreviewProps {
  tagTitle: string;
  setTagTitle: (value: string) => void;
  metaDescription: string;
  setMetaDescription: (value: string) => void;
  productUrl: string;
  setProductUrl: (value: string) => void;
}

export function SeoPreview({
  tagTitle = "",
  setTagTitle,
  metaDescription = "",
  setMetaDescription,
  productUrl = "",
  setProductUrl
}: SeoPreviewProps) {
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTagTitle(e.target.value);
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setMetaDescription(e.target.value);
  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) =>
    setProductUrl(e.target.value);

  // Limites de caracteres
  const MAX_TITLE_LENGTH = 70;
  const MAX_DESCRIPTION_LENGTH = 250;

  return (
    <div className="flex flex-col space-y-4 p-4 border rounded-lg sm:flex-row sm:space-x-4">
      <div className="flex-1 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="tagTitle">Tag Title</Label>
          <Input
            id="tagTitle"
            placeholder="Ex. Camiseta Básica Feminina"
            value={tagTitle}
            onChange={handleTitleChange}
            maxLength={MAX_TITLE_LENGTH}
            aria-describedby="tagTitleLength"
          />
          <span id="tagTitleLength" className="text-gray-700 text-sm">
            {tagTitle?.length ?? 0} de {MAX_TITLE_LENGTH} caracteres
          </span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="metaDescription">Meta Tag Description</Label>
          <Textarea
            id="metaDescription"
            placeholder="Ex. Esta camisa é uma peça ideal para compor looks relaxados ou sofisticados"
            value={metaDescription}
            onChange={handleDescriptionChange}
            maxLength={MAX_DESCRIPTION_LENGTH}
            aria-describedby="metaDescriptionLength"
          />
          <span id="metaDescriptionLength" className="text-gray-700 text-sm">
            {metaDescription?.length ?? 0} de {MAX_DESCRIPTION_LENGTH}{" "}
            caracteres
          </span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="productUrl">URL do produto</Label>
          <Input
            id="productUrl"
            placeholder="https://www.seusite.com.br/produto-exemplo"
            value={productUrl}
            onChange={handleUrlChange}
            aria-describedby="productUrlHelp"
          />
          <span id="productUrlHelp" className="text-gray-700 text-sm">
            {productUrl}
          </span>
        </div>
      </div>

      <div className="flex-1 mt-6 p-4 border rounded-lg">
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
