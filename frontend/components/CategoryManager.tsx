"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export function CategoryManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <Input
          id="categorySearch"
          placeholder="Busque pelo nome da categoria"
          className="flex-grow"
        />
        <Button onClick={() => setIsDialogOpen(true)}>+ Criar categoria</Button>
      </div>

      <div className="border p-4 rounded-lg">
        <div className="flex flex-col space-y-2">
          <Checkbox id="ceresBrasil" />
          <Label htmlFor="ceresBrasil">Ceres Brasil</Label>
          <div className="ml-4 flex flex-col space-y-2">
            <Checkbox id="tipoConchiglione" />
            <Label htmlFor="tipoConchiglione">Tipo Conchiglione</Label>
            <Checkbox id="tipoFusilli" />
            <Label htmlFor="tipoFusilli">Tipo Fusilli</Label>
            <Checkbox id="tipoPenne" />
            <Label htmlFor="tipoPenne">Tipo Penne</Label>
            <Checkbox id="tipoRisoni" />
            <Label htmlFor="tipoRisoni">Tipo Risoni</Label>
            <Checkbox id="tipoTalharim" />
            <Label htmlFor="tipoTalharim">Tipo Talharim</Label>
          </div>
          <Checkbox id="origens" />
          <Label htmlFor="origens">Origens</Label>
          <div className="ml-4 flex flex-col space-y-2">
            <Checkbox id="tipoConchiglioneOrigem" />
            <Label htmlFor="tipoConchiglioneOrigem">Tipo Conchiglione</Label>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="hidden">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Criar Categoria</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <div>
              <Label htmlFor="parentCategory">Categoria Pai</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria pai" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ceresBrasil">Ceres Brasil</SelectItem>
                  <SelectItem value="origens">Origens</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="categoryName">Nome da Categoria</Label>
              <Input id="categoryName" placeholder="Nome da Categoria" />
            </div>
            <div>
              <Label htmlFor="categoryDescription">Descrição</Label>
              <Input id="categoryDescription" placeholder="Descrição" />
            </div>
          </div>
          <DialogFooter className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button>Criar Categoria</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
