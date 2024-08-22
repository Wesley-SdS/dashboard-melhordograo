import Layout from "@/components/Layout";

export default function Settings() {
  return (
    <Layout>
      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Configurações</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Conta</h3>
            <div className="mb-4">
              <label className="block font-medium mb-2">Nome:</label>
              <input
                type="text"
                placeholder="Seu Nome"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">E-mail:</label>
              <input
                type="email"
                placeholder="seu.email@exemplo.com"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Senha:</label>
              <input
                type="password"
                placeholder="********"
                className="w-full p-2 border rounded"
              />
            </div>
            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Salvar Alterações
            </button>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Notificações</h3>
            <div className="mb-4">
              <label className="block font-medium mb-2">
                Receber Notificações por E-mail:
              </label>
              <input
                type="checkbox"
                id="email-notifications"
                className="mr-2"
              />
              <label htmlFor="email-notifications">Ativar</label>
            </div>
            <div>
              <label className="block font-medium mb-2">
                Notificações de Push:
              </label>
              <input type="checkbox" id="push-notifications" className="mr-2" />
              <label htmlFor="push-notifications">Ativar</label>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Segurança</h3>
            <div className="mb-4">
              <label className="block font-medium mb-2">
                Autenticação de Dois Fatores:
              </label>
              <input type="checkbox" id="two-factor-auth" className="mr-2" />
              <label htmlFor="two-factor-auth">Ativar</label>
            </div>
            <div>
              <label className="block font-medium mb-2">Sessões Ativas:</label>
              <button className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Deslogar de Todas as Sessões
              </button>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Privacidade</h3>
            <div className="mb-4">
              <label className="block font-medium mb-2">Perfil Público:</label>
              <input type="checkbox" id="public-profile" className="mr-2" />
              <label htmlFor="public-profile">Ativar</label>
            </div>
            <div>
              <label className="block font-medium mb-2">
                Histórico de Atividades:
              </label>
              <button className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                Limpar Histórico
              </button>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Idioma</h3>
            <div>
              <label className="block font-medium mb-2">
                Selecione o Idioma:
              </label>
              <select className="w-full p-2 border rounded">
                <option>Português</option>
                <option>Inglês</option>
                <option>Espanhol</option>
              </select>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Sistema</h3>
            <div className="mb-4">
              <label className="block font-medium mb-2">
                Atualizações Automáticas:
              </label>
              <input type="checkbox" id="auto-updates" className="mr-2" />
              <label htmlFor="auto-updates">Ativar</label>
            </div>
            <div>
              <label className="block font-medium mb-2">
                Relatórios de Erros:
              </label>
              <input type="checkbox" id="error-reporting" className="mr-2" />
              <label htmlFor="error-reporting">Enviar Automaticamente</label>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Dados</h3>
            <div className="mb-4">
              <label className="block font-medium mb-2">Exportar Dados:</label>
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Exportar
              </button>
            </div>
            <div>
              <label className="block font-medium mb-2">Excluir Conta:</label>
              <button className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Excluir Conta
              </button>
            </div>
          </section>
        </div>
      </section>
    </Layout>
  );
}
