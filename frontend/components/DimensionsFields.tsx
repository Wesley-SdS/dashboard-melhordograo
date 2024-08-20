import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { FC } from "react";

interface DimensionsFieldsProps {
  weight: string;
  setWeight: (weight: string) => void;
  height: string;
  setHeight: (height: string) => void;
  width: string;
  setWidth: (width: string) => void;
  depth: string;
  setDepth: (depth: string) => void;
}

export const DimensionsFields: FC<DimensionsFieldsProps> = ({
  weight,
  setWeight,
  height,
  setHeight,
  width,
  setWidth,
  depth,
  setDepth
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
      <div className="flex flex-col space-y-2 w-full sm:w-1/4">
        <Label htmlFor="weight">Peso</Label>
        <Input
          id="weight"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Kg"
        />
      </div>

      <div className="flex flex-col space-y-2 w-full sm:w-1/4">
        <Label htmlFor="height">Altura</Label>
        <Input
          id="height"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="cm"
        />
      </div>

      <div className="flex flex-col space-y-2 w-full sm:w-1/4">
        <Label htmlFor="width">Largura</Label>
        <Input
          id="width"
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          placeholder="cm"
        />
      </div>

      <div className="flex flex-col space-y-2 w-full sm:w-1/4">
        <Label htmlFor="depth">Profundidade</Label>
        <Input
          id="depth"
          type="number"
          value={depth}
          onChange={(e) => setDepth(e.target.value)}
          placeholder="cm"
        />
      </div>
    </div>
  );
};
