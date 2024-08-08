"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Layout from "@/components/Layout";
import React from "react";
import { Separator } from "@/components/ui/separator";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 }
];

const paymentData = [
  { day: "01", approved: 120, rejected: 30 },
  { day: "02", approved: 150, rejected: 20 },
  { day: "03", approved: 170, rejected: 40 },
  { day: "04", approved: 130, rejected: 25 },
  { day: "05", approved: 160, rejected: 35 },
  { day: "06", approved: 180, rejected: 50 }
];

const stateSalesData = [
  { state: "SP", value: 450, fill: "hsl(var(--chart-1))" },
  { state: "RJ", value: 300, fill: "hsl(var(--chart-2))" },
  { state: "MG", value: 250, fill: "hsl(var(--chart-3))" },
  { state: "RS", value: 150, fill: "hsl(var(--chart-4))" }
];

const paymentMethodsData = [
  { paymentMethod: "Boleto", value: 300, fill: "hsl(var(--chart-1))" },
  { paymentMethod: "Pix", value: 250, fill: "hsl(var(--chart-2))" },
  { paymentMethod: "Crédito", value: 450, fill: "hsl(var(--chart-3))" }
];

const freightData = [
  { uf: "SP", valor: 1500 },
  { uf: "RJ", valor: 1200 },
  { uf: "MG", valor: 1000 },
  { uf: "RS", valor: 800 },
  { uf: "BA", valor: 700 },
  { uf: "PR", valor: 650 },
  { uf: "PE", valor: 600 },
  { uf: "CE", valor: 550 },
  { uf: "SC", valor: 500 },
  { uf: "GO", valor: 450 },
  { uf: "MS", valor: 400 },
  { uf: "MA", valor: 350 },
  { uf: "MT", valor: 300 },
  { uf: "PA", valor: 250 },
  { uf: "ES", valor: 200 },
  { uf: "AL", valor: 150 },
  { uf: "SE", valor: 100 },
  { uf: "TO", valor: 80 },
  { uf: "RO", valor: 70 },
  { uf: "AC", valor: 60 },
  { uf: "AP", valor: 50 },
  { uf: "RR", valor: 40 },
  { uf: "AM", valor: 30 },
  { uf: "PI", valor: 20 },
  { uf: "MA", valor: 10 }
];

const totalFreightValue = freightData.reduce(
  (acc, curr) => acc + curr.valor,
  0
);
const mostExpensiveState = freightData.reduce(
  (max, curr) => (curr.valor > max.valor ? curr : max),
  freightData[0]
);
const chartConfig = {
  desktop: { label: "Desktop", color: "#2563eb" },
  mobile: { label: "Mobile", color: "#60a5fa" },
  running: { label: "Running", color: "hsl(var(--chart-1))" },
  swimming: { label: "Swimming", color: "hsl(var(--chart-2))" },
  approved: { label: "Approved", color: "hsl(var(--chart-1))" },
  rejected: { label: "Rejected", color: "hsl(var(--chart-2))" },
  boleto: { label: "Boleto", color: "hsl(var(--chart-1))" },
  pix: { label: "Pix", color: "hsl(var(--chart-2))" },
  creditCard: { label: "Crédito", color: "hsl(var(--chart-3))" },
  sp: { label: "São Paulo", color: "hsl(var(--chart-1))" },
  rj: { label: "Rio de Janeiro", color: "hsl(var(--chart-2))" },
  mg: { label: "Minas Gerais", color: "hsl(var(--chart-3))" },
  rs: { label: "Rio Grande do Sul", color: "hsl(var(--chart-4))" },
  total: { label: "Total de Frete", color: "hsl(var(--chart-1))" },
  highestState: { label: "Estado Mais Caro", color: "hsl(var(--chart-2))" },

  views: {
    label: "Custo de Envio"
  },
  freight: {
    label: "Custo de Envio por Estado",
    color: "hsl(var(--chart-1))"
  }
};

const formatCurrency = (value: number) => `R$ ${value.toLocaleString()}`;

export default function Diary() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("total");

  const total = React.useMemo(() => {
    const totalValue = freightData.reduce((acc, curr) => acc + curr.valor, 0);
    const highestValue = Math.max(...freightData.map((data) => data.valor));
    return { total: totalValue, highestState: highestValue };
  }, []);

  const highestState = React.useMemo(
    () => freightData.find((data) => data.valor === total.highestState),
    [total.highestState]
  );

  return (
    <Layout>
      <main className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 my-5 dark:text-black">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Receita Total</h2>
          <p className="text-2xl">{formatCurrency(3456000)}</p>
          <p className="text-green-500">+6.2%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Total de Vendas</h2>
          <p className="text-2xl">{formatCurrency(45200)}</p>
          <p className="text-green-500">+4.8%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Total de Produtos</h2>
          <p className="text-2xl">2,450</p>
          <p className="text-green-500">+2.5%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Total de Visitantes</h2>
          <p className="text-2xl">3,466</p>
          <p className="text-green-500">+3.6%</p>
        </div>
      </main>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full p-4">
        <Card>
          <CardHeader>
            <CardTitle>Visualizações Desktop - Mobile</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar
                  dataKey="desktop"
                  fill={chartConfig.desktop.color}
                  radius={4}
                />
                <Bar
                  dataKey="mobile"
                  fill={chartConfig.mobile.color}
                  radius={4}
                />
                <LabelList
                  dataKey="desktop"
                  position="top"
                  formatter={formatCurrency}
                />
                <LabelList
                  dataKey="mobile"
                  position="top"
                  formatter={formatCurrency}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evolução de Faturamento</CardTitle>
            <CardDescription>Jan - Jun 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart data={paymentData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar
                  dataKey="approved"
                  fill={chartConfig.approved.color}
                  radius={4}
                />
                <Bar
                  dataKey="rejected"
                  fill={chartConfig.rejected.color}
                  radius={4}
                />
                <LabelList
                  dataKey="approved"
                  position="top"
                  formatter={formatCurrency}
                />
                <LabelList
                  dataKey="rejected"
                  position="top"
                  formatter={formatCurrency}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <main className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 my-5 dark:text-black">
        <div className="bg-stone-200 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Faturamento / últimos 30 dias
          </h2>
          <p className="text-2xl">{formatCurrency(3456000)}</p>
          <p className="text-green-500">+6.2%</p>
        </div>
        <div className="bg-stone-300 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Faturamento médio dia / últimos 30 dias
          </h2>
          <p className="text-2xl">{formatCurrency(45200)}</p>
          <p className="text-green-500">+4.8%</p>
        </div>
        <div className="bg-zinc-200 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Ticket médio / últimos 30 dias
          </h2>
          <p className="text-2xl">2,450</p>
          <p className="text-green-500">+2.5%</p>
        </div>
        <div className="bg-neutral-200 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Taxa de conversão / últimos 30 dias
          </h2>
          <p className="text-2xl">3,466</p>
          <p className="text-green-500">+3.6%</p>
        </div>
      </main>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full p-4">
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Aprovados e Reprovados</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart data={paymentData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar
                  dataKey="approved"
                  fill={chartConfig.approved.color}
                  radius={4}
                />
                <Bar
                  dataKey="rejected"
                  fill={chartConfig.rejected.color}
                  radius={4}
                />
                <LabelList
                  dataKey="approved"
                  position="top"
                  formatter={formatCurrency}
                />
                <LabelList
                  dataKey="rejected"
                  position="top"
                  formatter={formatCurrency}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Forma de Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <PieChart>
                <Pie
                  data={paymentMethodsData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius="80%"
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {paymentMethodsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vendas por Estado</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <PieChart>
                <Pie
                  data={stateSalesData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius="80%"
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {stateSalesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
            <div className="flex flex-col justify-center gap-1 px-6 py-5 sm:py-6">
              <CardTitle>Custo de Envio por Estado</CardTitle>
              <CardDescription>
                Custo total de frete e estado mais caro nos últimos 30 dias
              </CardDescription>
            </div>
            <div className="flex-row">
              <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                <span className="text-md text-muted-foreground">
                  Valor Total de Frete
                </span>

                <span className="text-lg font-bold leading-none sm:text-lg">
                  {totalFreightValue.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </span>
              </div>
              <Separator className="flex w-80" />
              <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                <span className="text-md text-muted-foreground">
                  Estado Mais Caro
                </span>
                <span className="text-lg font-bold leading-none sm:text-lg">
                  {mostExpensiveState.uf} -{" "}
                  {mostExpensiveState.valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-2 sm:p-6">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={freightData}
                margin={{
                  left: 12,
                  right: 12
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="uf"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                />
                <YAxis
                  tickFormatter={(value) =>
                    value.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL"
                    })
                  }
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[150px]"
                      nameKey="valor"
                      labelFormatter={(value) => `Estado: ${value}`}
                    />
                  }
                />
                <Bar dataKey="valor" fill={`var(--color-freight)`} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
