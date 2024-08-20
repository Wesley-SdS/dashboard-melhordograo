import AccountsPayable from "@/components/AccountsPayable";
import AccountsReceivable from "@/components/AccountsReceivable";
import Cashbox from "@/components/Cashbox";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Financial() {
  return (
    <Layout>
      <section aria-labelledby="financial-heading" className="m-10">
        <h2
          id="financial-heading"
          className="text-2xl font-bold mb-4 text-center"
        >
          Financeiro
        </h2>
        <Tabs defaultValue="caixa" className="w-full">
          <TabsList className="flex justify-center w-full mb-6">
            <TabsTrigger value="caixa" className="w-full text-center">
              Caixa
            </TabsTrigger>
            <TabsTrigger value="contas-a-pagar" className="w-full text-center">
              Contas a Pagar
            </TabsTrigger>
            <TabsTrigger
              value="contas-a-receber"
              className="w-full text-center"
            >
              Contas a Receber
            </TabsTrigger>
          </TabsList>

          <TabsContent value="caixa">
            <article aria-labelledby="caixa-heading">
              <Cashbox />
            </article>
          </TabsContent>

          <TabsContent value="contas-a-pagar">
            <article aria-labelledby="contas-a-pagar-heading">
              <AccountsPayable />
            </article>
          </TabsContent>

          <TabsContent value="contas-a-receber">
            <article aria-labelledby="contas-a-receber-heading">
              <AccountsReceivable />
            </article>
          </TabsContent>
        </Tabs>
      </section>
    </Layout>
  );
}
