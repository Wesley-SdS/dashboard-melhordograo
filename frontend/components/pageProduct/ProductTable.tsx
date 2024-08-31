"use client";

import React, { useEffect, useState } from "react";
import axios from "@/utils/axiosConfig";
import { Eye, Edit, Trash } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import EditProductDialog from "@/components/EditProductDialog";
import { Product } from "@/app/types/types";

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log("Fetching products...");

    axios
      .get<{ products: Product[]; total: number }>(
        `${process.env.NEXT_PUBLIC_ECOMMERCE_API_URL}/products`
      )
      .then((response) => {
        console.log("API Response:", response.data);
        if (response.data.products && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          console.error("Unexpected API response format");
          setError("Unexpected API response format");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching products");
        setLoading(false);
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleOpenDialog = (productId: string) => {
    setSelectedProductId(productId);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
    setDialogOpen(false);
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm("Tem certeza de que deseja deletar este produto?")) {
      axios
        .delete(
          `${process.env.NEXT_PUBLIC_ECOMMERCE_API_URL}/products/${productId}`
        )
        .then(() => {
          setProducts(products.filter((product) => product._id !== productId));
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
          alert("Erro ao deletar o produto.");
        });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <Table className="w-full min-w-[800px] overflow-x-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-center">
              <Checkbox />
            </TableHead>
            <TableHead className="text-center">Produto</TableHead>
            <TableHead className="text-center">Categoria</TableHead>
            <TableHead className="text-center">Preço</TableHead>
            <TableHead className="text-center">Estoque</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Nenhum produto encontrado.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product._id}>
                <TableCell className="text-center">
                  <Checkbox />
                </TableCell>
                <TableCell className="text-center">
                  {product.productName}
                </TableCell>
                <TableCell className="text-center">
                  {product.categories.join(", ")}
                </TableCell>
                <TableCell className="text-center">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  }).format(product.sellingPrice)}
                </TableCell>
                <TableCell className="text-center">
                  {product.quantity}
                </TableCell>
                <TableCell className="text-center flex gap-2 justify-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-0"
                          onClick={() => console.log("Ver produto")}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">View</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-0"
                          onClick={() => handleOpenDialog(product._id)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">Edit</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-0"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">Delete</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {dialogOpen && selectedProductId && (
        <EditProductDialog
          product={products.find((p) => p._id === selectedProductId)!}
          open={dialogOpen}
          onClose={handleCloseDialog}
          onSave={handleSaveProduct}
        />
      )}
    </main>
  );
};

export default ProductTable;
