"use client";

import Layout from "@/components/Layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";

interface Category {
  id: number;
  name: string;
  status: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      setCategories([
        ...categories,
        { id: categories.length + 1, name: newCategory, status: "Active" }
      ]);
      setNewCategory("");
    }
  };

  const handleEditCategory = (id: number) => {
    // Lógica para editar categoria
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  return (
    <Layout>
      <div className="max-w-2xl mt-24 mx-auto">
        <h1 className="text-2xl font-bold mb-4">Gerenciar Categorias</h1>
        <Card className="mb-4">
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newCategory">Nova Categoria</Label>
                <Input
                  id="newCategory"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Nome da nova categoria"
                />
              </div>
              <Button onClick={handleAddCategory}>Adicionar Categoria</Button>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-xl font-semibold mb-2">Categorias Existentes</h2>
        {categories.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.status}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => handleEditCategory(category.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-gray-500">Nenhuma categoria cadastrada.</p>
        )}
      </div>
    </Layout>
  );
}
