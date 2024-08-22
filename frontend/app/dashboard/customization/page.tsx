import Layout from "@/components/Layout";

export default function Customization() {
  return (
    <Layout>
      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Personalização</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Tema</h3>
            <div className="flex items-center mb-4">
              <label className="mr-4 font-medium">Modo:</label>
              <button className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600">
                Claro
              </button>
              <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">
                Escuro
              </button>
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Paleta de Cores:</label>
              <select className="w-full p-2 border rounded">
                <option>Azul</option>
                <option>Verde</option>
                <option>Vermelho</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-2">Fonte:</label>
              <select className="w-full p-2 border rounded">
                <option>Sans-serif</option>
                <option>Serif</option>
                <option>Monospace</option>
              </select>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Layout</h3>
            <div className="mb-4">
              <label className="block font-medium mb-2">
                Estilo de Navegação:
              </label>
              <div className="flex">
                <button className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600">
                  Menu Lateral
                </button>
                <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">
                  Menu Superior
                </button>
              </div>
            </div>
            <div>
              <label className="block font-medium mb-2">Tamanho do Menu:</label>
              <select className="w-full p-2 border rounded">
                <option>Compacto</option>
                <option>Normal</option>
                <option>Expandido</option>
              </select>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Notificações</h3>
            <div className="mb-4">
              <label className="block font-medium mb-2">
                Notificações de Sistema:
              </label>
              <div className="flex items-center">
                <input type="checkbox" id="email" className="mr-2" />
                <label htmlFor="email" className="mr-4">
                  E-mail
                </label>
                <input type="checkbox" id="popups" className="mr-2" />
                <label htmlFor="popups">Pop-ups</label>
              </div>
            </div>
            <div>
              <label className="block font-medium mb-2">
                Som de Notificações:
              </label>
              <input type="checkbox" id="sound" className="mr-2" />
              <label htmlFor="sound">Ativar</label>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Acessibilidade</h3>
            <div className="mb-4">
              <label className="block font-medium mb-2">
                Tamanho da Fonte:
              </label>
              <input
                type="range"
                min="12"
                max="24"
                defaultValue="16"
                className="w-full"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Contraste:</label>
              <input type="checkbox" id="high-contrast" className="mr-2" />
              <label htmlFor="high-contrast">Modo Alto Contraste</label>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Idiomas</h3>
            <label className="block font-medium mb-2">
              Selecione o Idioma:
            </label>
            <select className="w-full p-2 border rounded">
              <option>Português</option>
              <option>Inglês</option>
              <option>Espanhol</option>
            </select>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Performance</h3>
            <div className="mb-4">
              <label className="block font-medium mb-2">Animações:</label>
              <input type="checkbox" id="animations" className="mr-2" />
              <label htmlFor="animations">Ativar</label>
            </div>
            <div>
              <label className="block font-medium mb-2">
                Pré-carregamento de Dados:
              </label>
              <input type="checkbox" id="preloading" className="mr-2" />
              <label htmlFor="preloading">Ativar</label>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Perfil</h3>
            <div className="mb-4">
              <label className="block font-medium mb-2">
                Imagem de Perfil:
              </label>
              <input type="file" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">
                Informações Pessoais:
              </label>
              <input
                type="text"
                placeholder="Nome"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="email"
                placeholder="E-mail"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">
                Preferências de Sessão:
              </label>
              <input type="checkbox" id="session-timeout" className="mr-2" />
              <label htmlFor="session-timeout">Lembrar Sessão</label>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Atalhos</h3>
            <label className="block font-medium mb-2">
              Configurar Atalhos:
            </label>
            <div className="mb-2">
              <input
                type="text"
                placeholder="Ex: Ctrl + S"
                className="w-full p-2 border rounded"
              />
            </div>
            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Salvar Atalho
            </button>
          </section>
        </div>
      </section>
    </Layout>
  );
}
