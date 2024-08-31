import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Criação de uma interface personalizada que estende a interface Request
interface AuthenticatedRequest extends Request {
  user?: { _id: string };
}

export const authToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    console.log("Token ausente!"); // Log para verificar se o token está presente
    return res.status(401).json({ message: "Access denied, token missing!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log("Token decodificado:", decoded); // Log para verificar o conteúdo do token decodificado
    req.user = decoded as { _id: string };
    next();
  } catch (error) {
    console.error("Erro ao verificar o token:", error); // Log para capturar qualquer erro de verificação do token
    res.status(400).json({ message: "Invalid token" });
  }
};
