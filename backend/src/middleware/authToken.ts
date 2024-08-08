import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded as any; // Se você tiver um tipo específico para o usuário, substitua `any` por esse tipo
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};
