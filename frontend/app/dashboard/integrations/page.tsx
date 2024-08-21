"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "@/components/Layout";

interface Ecommerce {
  id: string;
  name: string;
  status: string;
  access: boolean;
  notesIssued: number;
  clients: number;
  orders: number;
  autoSync: boolean; // Nova propriedade para sincronização automática
  syncFrequency: number; // Nova propriedade para frequência de sincronização
  notifications: {
    email: string | null;
    webhook: string | null;
    errors: boolean;
    events: boolean;
  };
}

export default function Integrations() {
  const [ecommerces, setEcommerces] = useState<Ecommerce[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newEcommerce, setNewEcommerce] = useState<string>("");

  useEffect(() => {
    // Exemplo de e-commerces fictícios para visualização
    const exampleEcommerces: Ecommerce[] = [
      {
        id: "1",
        name: "E-commerce Alpha",
        status: "ativo",
        access: true,
        notesIssued: 120,
        clients: 350,
        orders: 500,
        autoSync: true,
        syncFrequency: 30,
        notifications: {
          email: "example@domain.com",
          webhook: "https://example.com/webhook",
          errors: true,
          events: false
        }
      }
      // Adicione mais e-commerces aqui se necessário
    ];

    // Usando os exemplos para visualização
    setEcommerces(exampleEcommerces);
    setLoading(false);
  }, []);

  const handleSync = async (id: string) => {
    // Simulação de sincronização
    alert(`Sincronização de e-commerce com ID: ${id}`);
  };

  const handleToggleAccess = async (id: string, access: boolean) => {
    // Simulação de ativação/desativação de acesso
    setEcommerces((prev) =>
      prev.map((ecom) => (ecom.id === id ? { ...ecom, access: access } : ecom))
    );
  };

  const handleDisconnect = async (id: string) => {
    // Simulação de desconexão
    setEcommerces((prev) => prev.filter((ecom) => ecom.id !== id));
  };

  const handleNewIntegration = async () => {
    // Simulação de nova integração
    if (newEcommerce.trim() === "")
      return alert("Preencha o nome do e-commerce.");
    setEcommerces((prev) => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        name: newEcommerce,
        status: "ativo",
        access: true,
        notesIssued: 0,
        clients: 0,
        orders: 0,
        autoSync: false,
        syncFrequency: 0,
        notifications: {
          email: null,
          webhook: null,
          errors: false,
          events: false
        }
      }
    ]);
    setNewEcommerce("");
  };

  const handleAutoSyncToggle = (id: string, autoSync: boolean) => {
    setEcommerces((prev) =>
      prev.map((ecom) =>
        ecom.id === id ? { ...ecom, autoSync: autoSync } : ecom
      )
    );
  };

  const handleSyncFrequencyChange = (id: string, frequency: number) => {
    setEcommerces((prev) =>
      prev.map((ecom) =>
        ecom.id === id ? { ...ecom, syncFrequency: frequency } : ecom
      )
    );
  };

  const handleNotificationChange = (id: string, type: string, value: any) => {
    setEcommerces((prev) =>
      prev.map((ecom) =>
        ecom.id === id
          ? {
              ...ecom,
              notifications: {
                ...ecom.notifications,
                [type]: value
              }
            }
          : ecom
      )
    );
  };

  return (
    <Layout>
      <main className="container mx-auto p-6">
        <section className="mb-8">
          <h1 className="text-2xl font-bold mb-4">
            Integração com E-commerces
          </h1>
          <p className="mb-6">
            Gerencie os e-commerces conectados, integre novos e veja como
            utilizar nossa API.
          </p>

          {/* Seção de Integração com Nova API */}
          <h2 className="text-xl font-semibold mb-4">
            Faça uma Nova Integração
          </h2>
          <div className="mb-6 flex items-center">
            <input
              type="text"
              value={newEcommerce}
              onChange={(e) => setNewEcommerce(e.target.value)}
              placeholder="Nome do Novo E-commerce"
              className="border p-2 mr-2 rounded w-full max-w-md"
            />
            <button
              onClick={handleNewIntegration}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Integrar E-commerce
            </button>
          </div>

          {/* Exibição da API Disponível */}
          <h2 className="text-xl font-semibold mb-4">API de Integração</h2>
          <div className="mb-6">
            <h3 className="font-semibold">Base URL:</h3>
            <pre className="bg-gray-100 p-4 rounded">
              https://api.seu-dominio.com/v1
            </pre>

            <h3 className="font-semibold mt-4">Endpoints:</h3>
            <ul className="list-disc list-inside ml-4">
              <li>
                <strong>GET /ecommerces</strong> - Retorna uma lista de
                e-commerces conectados.
              </li>
              <li>
                <strong>POST /ecommerces</strong> - Integra um novo e-commerce.
              </li>
              <li>
                <strong>PUT /ecommerces/:id/access</strong> - Gerencia
                permissões de acesso de um e-commerce.
              </li>
              <li>
                <strong>POST /ecommerces/:id/sync</strong> - Sincroniza os dados
                de um e-commerce.
              </li>
              <li>
                <strong>DELETE /ecommerces/:id</strong> - Desconecta um
                e-commerce.
              </li>
            </ul>

            <h3 className="font-semibold mt-4">Exemplo de Uso com Fetch:</h3>
            <pre className="bg-gray-100 p-4 rounded">
              {`fetch("https://api.seu-dominio.com/v1/ecommerces", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer SEU_TOKEN"
  },
  body: JSON.stringify({ name: "Novo E-commerce" })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));`}
            </pre>

            <h3 className="font-semibold mt-4">Exemplo de Uso com Axios:</h3>
            <pre className="bg-gray-100 p-4 rounded">
              {`axios.post("https://api.seu-dominio.com/v1/ecommerces", {
  name: "Novo E-commerce"
}, {
  headers: {
    "Authorization": "Bearer SEU_TOKEN"
  }
})
  .then(response => console.log(response.data))
  .catch(error => console.error(error));`}
            </pre>
          </div>

          {/* Tabela de E-commerces Conectados */}
          <h2 className="text-xl font-semibold mb-4">E-commerces Conectados</h2>
          {loading ? (
            <p>Carregando e-commerces...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ecommerces.map((ecommerce) => (
                <div
                  key={ecommerce.id}
                  className="bg-white shadow rounded-lg p-6"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {ecommerce.name}
                  </h3>
                  <p
                    className={`mb-4 ${
                      ecommerce.status === "ativo"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {ecommerce.status}
                  </p>
                  <p className="mb-4">
                    Acesso: {ecommerce.access ? "Completo" : "Limitado"}
                  </p>
                  <div className="mb-4 text-sm text-gray-600">
                    <p>Notas Emitidas: {ecommerce.notesIssued}</p>
                    <p>Clientes: {ecommerce.clients}</p>
                    <p>Pedidos: {ecommerce.orders}</p>
                    <div className="mt-4">
                      <label className="block mb-2">
                        Sincronização Automática:
                      </label>
                      <select
                        value={ecommerce.autoSync ? "automatic" : "manual"}
                        onChange={(e) =>
                          handleAutoSyncToggle(
                            ecommerce.id,
                            e.target.value === "automatic"
                          )
                        }
                        className="border p-2 rounded"
                      >
                        <option value="automatic">Automática</option>
                        <option value="manual">Manual</option>
                      </select>
                      {ecommerce.autoSync && (
                        <div className="mt-4">
                          <label className="block mb-2">
                            Frequência de Sincronização (minutos):
                          </label>
                          <input
                            type="number"
                            value={ecommerce.syncFrequency}
                            onChange={(e) =>
                              handleSyncFrequencyChange(
                                ecommerce.id,
                                +e.target.value
                              )
                            }
                            className="border p-2 rounded w-full max-w-md"
                          />
                        </div>
                      )}
                    </div>
                    <div className="mt-4">
                      <label className="block mb-2">
                        Notificações por E-mail:
                      </label>
                      <input
                        type="email"
                        value={ecommerce.notifications.email || ""}
                        onChange={(e) =>
                          handleNotificationChange(
                            ecommerce.id,
                            "email",
                            e.target.value
                          )
                        }
                        placeholder="Digite o e-mail para notificações"
                        className="border p-2 rounded w-full max-w-md"
                      />
                      <label className="block mb-2 mt-4">
                        Notificações por Webhook:
                      </label>
                      <input
                        type="url"
                        value={ecommerce.notifications.webhook || ""}
                        onChange={(e) =>
                          handleNotificationChange(
                            ecommerce.id,
                            "webhook",
                            e.target.value
                          )
                        }
                        placeholder="Digite a URL do webhook"
                        className="border p-2 rounded w-full max-w-md"
                      />
                      <div className="mt-4">
                        <label className="block mb-2">
                          Receber Notificações de Erros:
                        </label>
                        <input
                          type="checkbox"
                          checked={ecommerce.notifications.errors}
                          onChange={(e) =>
                            handleNotificationChange(
                              ecommerce.id,
                              "errors",
                              e.target.checked
                            )
                          }
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block mb-2">
                          Receber Notificações de Eventos Importantes:
                        </label>
                        <input
                          type="checkbox"
                          checked={ecommerce.notifications.events}
                          onChange={(e) =>
                            handleNotificationChange(
                              ecommerce.id,
                              "events",
                              e.target.checked
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleSync(ecommerce.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Sincronizar
                    </button>
                    <button
                      onClick={() =>
                        handleToggleAccess(ecommerce.id, !ecommerce.access)
                      }
                      className={`${
                        ecommerce.access ? "bg-yellow-500" : "bg-green-500"
                      } hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded`}
                    >
                      {ecommerce.access ? "Desativar Acesso" : "Ativar Acesso"}
                    </button>
                    <button
                      onClick={() => handleDisconnect(ecommerce.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Desconectar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </Layout>
  );
}
