import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FC } from "react";

interface BasicInfoFieldsProps {
  productName: string;
  setProductName: (name: string) => void;
  sellingPrice: string;
  setSellingPrice: (price: string) => void;
}

export const BasicInfoFields: FC<BasicInfoFieldsProps> = ({
  productName,
  setProductName,
  sellingPrice,
  setSellingPrice
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="productName">Nome do Produto *</Label>
        <Input
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Ex: Camiseta Básica Feminina"
          maxLength={40}
          required
        />
      </div>

      <div className="space-y-4">
        <Label htmlFor="sellingPrice">Preço de Venda *</Label>
        <Input
          id="sellingPrice"
          type="number"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
          placeholder="R$"
          required
        />
      </div>
    </>
  );
};
