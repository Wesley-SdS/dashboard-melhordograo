"use client";

import Layout from "@/components/Layout";
import IntegrationCard from "@/components/IntegrationCard";
import { useState } from "react";

interface Integration {
  name: string;
  description: string;
  logoUrl: string;
}

const integrations: Integration[] = [
  {
    name: "Shopify",
    description: "Sync your store with Shopify.",
    logoUrl: "/logos/shopify.png"
  },
  {
    name: "Stripe",
    description: "Integrate with Stripe for payments.",
    logoUrl: "/logos/stripe.png"
  }
];

export default function Integrations() {
  const [selectedIntegration, setSelectedIntegration] =
    useState<Integration | null>(null);

  const handleIntegrationClick = (integration: Integration) => {
    setSelectedIntegration(integration);
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">Integrações</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration) => (
            <IntegrationCard
              key={integration.name}
              name={integration.name}
              description={integration.description}
              logoUrl={integration.logoUrl}
              onClick={() => handleIntegrationClick(integration)}
            />
          ))}
        </div>
        {selectedIntegration && (
          <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-bold mb-4">
              {selectedIntegration.name} Integração
            </h3>
            <p className="text-gray-700">{selectedIntegration.description}</p>
            <div className="mt-4">
              <h4 className="text-xl font-semibold mb-2">Configurações</h4>
              {/* Exemplo de input para chaves de API */}
              <div className="mb-4">
                <label className="block text-gray-700">API Key</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Insira sua chave API"
                />
              </div>
              {/* Outros campos de configuração podem ser adicionados aqui */}
            </div>
            <div className="mt-4">
              <h4 className="text-xl font-semibold mb-2">Documentação</h4>
              <div className="prose">
                {/* Aqui você pode adicionar um editor de markdown para documentação */}
                <p>
                  Consulte a <a href="#">documentação oficial</a> para mais
                  detalhes.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
