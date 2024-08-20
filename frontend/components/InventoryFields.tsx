import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FC } from "react";

interface InventoryFieldsProps {
  sku: string;
  setSku: (sku: string) => void;
  gtin: string;
  setGtin: (gtin: string) => void;
}

export const InventoryFields: FC<InventoryFieldsProps> = ({
  sku,
  setSku,
  gtin,
  setGtin
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
      <div className="flex flex-col space-y-2 w-full sm:w-1/4">
        <Label htmlFor="sku">SKU *</Label>
        <Input
          id="sku"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
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
    </div>
  );
};
