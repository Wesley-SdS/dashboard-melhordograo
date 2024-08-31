import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import productRoutes from "./routes/productRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import authRoutes from "./routes/authRoutes";
import { authToken } from "./middleware/authToken";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE"
  })
);
app.use(express.json());

// Usa o roteador de autenticação com o prefixo /api
app.use("/api", authRoutes);

// Usa o roteador de produtos com o prefixo /products
app.use("/api/products", authToken, productRoutes);

// Usa o roteador de upload
app.use("/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("Servidor está funcionando!");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
