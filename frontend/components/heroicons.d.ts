declare module "@heroicons/react/solid" {
  import * as React from "react";

  export interface HeroIconProps extends React.SVGProps<SVGSVGElement> {}

  export const FunnelIcon: React.FC<HeroIconProps>;
  export const TrashIcon: React.FC<HeroIconProps>;
  export const UploadIcon: React.FC<HeroIconProps>;
  // Adicione outras declarações de ícones aqui, se necessário
}
