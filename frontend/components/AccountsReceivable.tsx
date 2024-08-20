"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { subDays } from "date-fns";

import { CiFilter } from "react-icons/ci";

import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover";

interface AccountReceivable {
  id: number;
  date: string;
  category: string;
  description: string;
  value: number;
  dueDate: string;
  status: "pending" | "received";
}

interface Filters {
  status: "all" | "pending" | "received";
  search: string;
  dateRange: [Date, Date];
}

const AccountsReceivable = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [accounts, setAccounts] = useState<AccountReceivable[]>([
    {
      id: 1,
      date: "2024-08-19",
      category: "Sales",
      description: "Online Store Sale",
      value: 300.0,
      dueDate: "2024-08-25",
      status: "pending"
    },
    {
      id: 2,
      date: "2024-08-20",
      category: "Services",
      description: "Consulting Fee",
      value: 800.0,
      dueDate: "2024-09-01",
      status: "received"
    }
  ]);

  const [filters, setFilters] = useState<Filters>({
    status: "all",
    search: "",
    dateRange: [subDays(new Date(), 30), new Date()]
  });

  const handleNewAccount = (newAccount: AccountReceivable) => {
    setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
    setIsDialogOpen(false);
  };

  const totalAccounts = accounts.reduce(
    (sum, account) => sum + account.value,
    0
  );
  const pendingAccounts = accounts
    .filter((account) => account.status === "pending")
    .reduce((sum, account) => sum + account.value, 0);
  const receivedAccounts = accounts
    .filter((account) => account.status === "received")
    .reduce((sum, account) => sum + account.value, 0);

  const filteredAccounts = accounts.filter((account) => {
    const matchStatus =
      filters.status === "all" || account.status === filters.status;
    const matchSearch =
      filters.search === "" ||
      account.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchDate =
      !filters.dateRange ||
      (new Date(account.date) >= filters.dateRange[0] &&
        new Date(account.date) <= filters.dateRange[1]);

    return matchStatus && matchSearch && matchDate;
  });

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4">Resumo</h3>
        <p>Total de Contas: R$ {totalAccounts.toFixed(2)}</p>
        <p>Contas a Receber: R$ {pendingAccounts.toFixed(2)}</p>
        <p>Contas Recebidas: R$ {receivedAccounts.toFixed(2)}</p>
      </div>

      {/* Main Content */}
      <div className="w-3/4 ml-8 space-y-4">
        <div className="flex justify-between items-center mb-4">
          <Input
            placeholder="Pesquisar por descrição"
            value={filters.search}
            onChange={(e) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                search: e.target.value
              }))
            }
            className="w-1/2"
          />

          <div className="flex items-center space-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <CiFilter className="mr-2" />
                  Filtros
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="p-4 space-y-4">
                  <div>
                    <label>Status</label>
                    <Select
                      value={filters.status}
                      onValueChange={(value) =>
                        setFilters((prevFilters) => ({
                          ...prevFilters,
                          status: value as Filters["status"]
                        }))
                      }
                    >
                      <option value="all">Todos</option>
                      <option value="pending">A Receber</option>
                      <option value="received">Recebidas</option>
                    </Select>
                  </div>

                  <div>
                    <label>Data</label>
                    <Calendar
                      selected={filters.dateRange}
                      onSelect={(range) =>
                        setFilters((prevFilters) => ({
                          ...prevFilters,
                          dateRange: range
                        }))
                      }
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsDialogOpen(true)}>
                  Nova Conta
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cadastro de Conta a Receber</DialogTitle>
                  <DialogDescription>
                    Preencha os campos abaixo para adicionar uma nova conta a
                    receber.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const newAccount: AccountReceivable = {
                      id: accounts.length + 1,
                      date: formData.get("date") as string,
                      category: formData.get("category") as string,
                      description: formData.get("description") as string,
                      value: parseFloat(formData.get("value") as string),
                      dueDate: formData.get("dueDate") as string,
                      status: "pending"
                    };
                    handleNewAccount(newAccount);
                  }}
                >
                  <div className="grid gap-4 py-4">
                    <label>
                      Data
                      <input
                        type="date"
                        name="date"
                        required
                        className="input"
                      />
                    </label>
                    <label>
                      Categoria
                      <input
                        type="text"
                        name="category"
                        required
                        className="input"
                      />
                    </label>
                    <label>
                      Descrição
                      <textarea
                        name="description"
                        required
                        className="textarea"
                      />
                    </label>
                    <label>
                      Valor
                      <input
                        type="number"
                        step="0.01"
                        name="value"
                        required
                        className="input"
                      />
                    </label>
                    <label>
                      Data de Vencimento
                      <input
                        type="date"
                        name="dueDate"
                        required
                        className="input"
                      />
                    </label>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Adicionar Conta</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Vencimento</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell>{account.date}</TableCell>
                <TableCell>{account.category}</TableCell>
                <TableCell>{account.description}</TableCell>
                <TableCell>R$ {account.value.toFixed(2)}</TableCell>
                <TableCell>{account.dueDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AccountsReceivable;
