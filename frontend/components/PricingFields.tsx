import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { FC } from "react";

interface PricingFieldsProps {
  costPrice: string;
  setCostPrice: (price: string) => void;
  promoPrice: string;
  setPromoPrice: (price: string) => void;
}

export const PricingFields: FC<PricingFieldsProps> = ({
  costPrice,
  setCostPrice,
  promoPrice,
  setPromoPrice
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
      <div className="flex flex-col space-y-2 w-full sm:w-1/3">
        <Label htmlFor="costPrice">Preço de Custo</Label>
        <Input
          id="costPrice"
          type="number"
          value={costPrice}
          onChange={(e) => setCostPrice(e.target.value)}
          placeholder="R$"
        />
      </div>

      <div className="flex flex-col space-y-2 w-full sm:w-1/3">
        <Label htmlFor="promoPrice">Preço Promocional</Label>
        <Input
          id="promoPrice"
          type="number"
          value={promoPrice}
          onChange={(e) => setPromoPrice(e.target.value)}
          placeholder="R$"
        />
      </div>
    </div>
  );
};
