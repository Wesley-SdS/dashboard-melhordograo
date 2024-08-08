// components/IntegrationCard.tsx
import React from "react";

interface IntegrationCardProps {
  name: string;
  description: string;
  logoUrl: string;
  onClick: () => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  name,
  description,
  logoUrl,
  onClick
}) => {
  return (
    <div
      className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 cursor-pointer"
      onClick={onClick}
    >
      <img src={logoUrl} alt={`${name} logo`} className="h-16 w-16" />
      <div>
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default IntegrationCard;
