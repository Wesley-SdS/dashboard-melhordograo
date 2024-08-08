"use client";

import Layout from "@/components/Layout";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

export default function Home() {
  return (
    <Layout>
      <main className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 my-5 dark:text-black">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Total Revenue</h2>
          <p className="text-2xl">$3,456K</p>
          <p className="text-green-500">+6.2%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Total Sales</h2>
          <p className="text-2xl">$45.2K</p>
          <p className="text-green-500">+4.8%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Total Products</h2>
          <p className="text-2xl">2,450</p>
          <p className="text-green-500">+2.5%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Total Visitors</h2>
          <p className="text-2xl">3,466</p>
          <p className="text-green-500">+3.6%</p>
        </div>
      </main>
      <div className="border mx-4 rounded-lg shadow-sm shadow-black">
        <h1 className="flex items-center justify-center text-2xl py-">
          Top Channels
        </h1>
        <Table className="w-full table-fixed  ">
          <TableCaption>Lista dos Canais de Vendas</TableCaption>
          <TableHeader className="">
            <TableRow className="w-full  ">
              <TableHead className="w-1/4 text-left">Canal</TableHead>
              <TableHead className="w-1/4 text-left">Receitas</TableHead>
              <TableHead className="w-1/4 text-left">Vendas</TableHead>
              <TableHead className="w-1/4 text-right">Conversão</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            <TableRow className="">
              <TableCell className="font-medium flex items-center ">
                <img
                  src="/assets/mercadolivre.png"
                  alt="Mercado Livre"
                  className="w-10 h-8 mr-4"
                />
                Mercado Livre
              </TableCell>
              <TableCell>R$ 1.200.000</TableCell>
              <TableCell>15.000</TableCell>
              <TableCell className="text-right">3.5%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium flex items-center">
                <img
                  src="/assets/magazineluiza.png"
                  alt="Magazine Luiza"
                  className="w-10 h-8 mr-4"
                />
                Magazine Luiza
              </TableCell>
              <TableCell>R$ 900.000</TableCell>
              <TableCell>12.000</TableCell>
              <TableCell className="text-right">2.8%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium flex items-center">
                <img
                  src="/assets/americanas.png"
                  alt="Americanas"
                  className="w-10 h-8 mr-4"
                />
                Americanas
              </TableCell>
              <TableCell>R$ 850.000</TableCell>
              <TableCell>8.500</TableCell>
              <TableCell className="text-right">2.5%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium flex items-center">
                <img
                  src="/assets/viavarejo.png"
                  alt="Via Varejo"
                  className="w-10 h-8 mr-4"
                />
                Via Varejo
              </TableCell>
              <TableCell>R$ 750.000</TableCell>
              <TableCell>9.000</TableCell>
              <TableCell className="text-right">2.7%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium flex items-center">
                <img
                  src="/assets/amazonbrasil.png"
                  alt="Amazon Brasil"
                  className="w-10 h-8 mr-4"
                />
                Amazon Brasil
              </TableCell>
              <TableCell>R$ 1.80.000</TableCell>
              <TableCell>13.000</TableCell>
              <TableCell className="text-right">3.0%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium flex items-center">
                <img
                  src="/assets/shopee.png"
                  alt="Shopee"
                  className="w-10 h-8 mr-4"
                />
                Shopee
              </TableCell>
              <TableCell>R$ 650.000</TableCell>
              <TableCell>8.500</TableCell>
              <TableCell className="text-right">2.2%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium flex items-center">
                <img
                  src="/assets/olist.png"
                  alt="Olist"
                  className="w-10 h-8 mr-4"
                />
                Olist
              </TableCell>
              <TableCell>R$ 700.000</TableCell>
              <TableCell>8.000</TableCell>
              <TableCell className="text-right">2.3%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium flex items-center">
                <img
                  src="/assets/loja-integrada.png"
                  alt="Loja Integrada"
                  className="w-10 h-8 mr-4"
                />
                Loja Integrada
              </TableCell>
              <TableCell>R$ 500.000</TableCell>
              <TableCell>7.000</TableCell>
              <TableCell className="text-right">1.9%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
}
