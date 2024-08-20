"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { IoCloudUploadOutline } from "react-icons/io5";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { FiSearch, FiFilter, FiEdit, FiTrash } from "react-icons/fi";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogFooter
} from "@/components/ui/dialog";

interface Transaction {
  date: string;
  category: string;
  description: string;
  value: number;
  client: string;
  reconciled: boolean;
}

export default function Cashbox() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      date: "06/08/2024",
      category: "Vendas",
      description: "PAGAMENTO DE FRETE NFS 3051,3052",
      value: -1806.43,
      client: "KANGU",
      reconciled: true
    },
    {
      date: "07/08/2024",
      category: "Compras",
      description: "Compra de Materiais",
      value: -500.0,
      client: "Fornecedor XYZ",
      reconciled: false
    }
    // Outras transações aqui...
  ]);

  const [filters, setFilters] = useState({
    searchTerm: "",
    status: "Registrados",
    reconciliationStatus: "Todas",
    dateRange: "Este mês",
    transactionType: "Todas"
  });

  const [balanceInfo, setBalanceInfo] = useState({
    initialBalance: -19.92,
    totalIncome: 4699.02,
    totalExpenses: 4060.55,
    finalBalance: 618.55
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, searchTerm: e.target.value });
  };

  const handleStatusChange = (status: string) => {
    setFilters({ ...filters, status });
  };

  const handleReconciliationChange = (reconciliationStatus: string) => {
    setFilters({ ...filters, reconciliationStatus });
  };

  const handleDateRangeChange = (dateRange: string) => {
    setFilters({ ...filters, dateRange });
  };

  const handleTransactionTypeChange = (transactionType: string) => {
    setFilters({ ...filters, transactionType });
  };

  const handleExport = () => {
    // Lógica para exportar o extrato
  };

  const handleClearFilters = () => {
    setFilters({
      searchTerm: "",
      status: "Registrados",
      reconciliationStatus: "Todas",
      dateRange: "Este mês",
      transactionType: "Todas"
    });
  };

  const handleAddTransaction = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleSubmitTransaction = () => {
    // Lógica para adicionar a nova transação
    setIsDialogOpen(false);
  };

  return (
    <section className="p-4">
      <h3 className="text-2xl font-bold mb-6">Caixas e Bancos</h3>

      {/* Barra de Filtros e Pesquisa */}
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <Input
            type="text"
            placeholder="Pesquisar por nome ou histórico"
            value={filters.searchTerm}
            onChange={handleInputChange}
            className="w-full max-w-xs"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <FiFilter className="w-5 h-5 mr-2" /> Filtrar
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="space-y-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Situação: {filters.status}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => handleStatusChange("Registrados")}
                    >
                      Registrados
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleStatusChange("Não Registrados")}
                    >
                      Não Registrados
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Situação da conciliação: {filters.reconciliationStatus}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => handleReconciliationChange("Todas")}
                    >
                      Todas
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleReconciliationChange("Conferidas")}
                    >
                      Conferidas
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        handleReconciliationChange("Não Conferidas")
                      }
                    >
                      Não Conferidas
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Período: {filters.dateRange}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => handleDateRangeChange("Este mês")}
                    >
                      Este mês
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDateRangeChange("Último mês")}
                    >
                      Último mês
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDateRangeChange("Últimos 3 meses")}
                    >
                      Últimos 3 meses
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Tipo: {filters.transactionType}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => handleTransactionTypeChange("Todas")}
                    >
                      Todas
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleTransactionTypeChange("Entradas")}
                    >
                      Entradas
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleTransactionTypeChange("Saídas")}
                    >
                      Saídas
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleClearFilters}
                >
                  Limpar Filtros
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleExport} variant="outline">
            <FiTrash className="w-5 h-5 mr-2" /> Exportar
          </Button>
          <Button onClick={handleAddTransaction} variant="outline">
            <IoCloudUploadOutline className="w-5 h-5 mr-2" /> Novo Lançamento
          </Button>
        </div>
      </div>

      {/* Informações de Saldo e Movimentações */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {/* Informações de Saldo */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Informações de Saldo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Saldo Inicial:</span>
                <span className="font-bold">
                  ${balanceInfo.initialBalance.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total de Entradas:</span>
                <span className="font-bold">
                  ${balanceInfo.totalIncome.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total de Saídas:</span>
                <span className="font-bold">
                  ${balanceInfo.totalExpenses.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Saldo Final:</span>
                <span className="font-bold">
                  ${balanceInfo.finalBalance.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Movimentações */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Movimentações</CardTitle>
          </CardHeader>
          <CardContent>
            <Separator />
            <div className="space-y-2">
              <div className="grid grid-cols-5 font-bold py-2 border-b">
                <span>Data</span>
                <span>Categoria</span>
                <span>Descrição</span>
                <span>Valor</span>
                <span>Cliente</span>
              </div>
              {transactions.map((transaction, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-5 py-2 ${
                    transaction.reconciled ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <span>{transaction.date}</span>
                  <span>{transaction.category}</span>
                  <span>{transaction.description}</span>
                  <span>${transaction.value.toFixed(2)}</span>
                  <span>{transaction.client}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Diálogo de Novo Lançamento */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTitle>Adicionar Novo Lançamento</DialogTitle>
        <DialogContent>
          <div className="space-y-4">
            {/* Formulário para adicionar nova transação */}
            <div>
              <Label htmlFor="date">Data</Label>
              <Input id="date" type="date" />
            </div>
            <div>
              <Label htmlFor="category">Categoria</Label>
              <Input id="category" type="text" />
            </div>
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Input id="description" type="text" />
            </div>
            <div>
              <Label htmlFor="value">Valor</Label>
              <Input id="value" type="number" step="0.01" />
            </div>
            <div>
              <Label htmlFor="client">Cliente</Label>
              <Input id="client" type="text" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmitTransaction}>Salvar</Button>
            <Button onClick={handleDialogClose} variant="outline">
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
