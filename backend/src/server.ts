import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import productRoutes from "./routes/productRoutes"; // Importa o roteador de produtos

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Usa o roteador de produtos com o prefixo `/api`
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Servidor está funcionando!");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
