import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../../models/userModel";
import jwt from "jsonwebtoken";

export const signinController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (
      !user ||
      typeof user.password !== "string" ||
      !(await bcrypt.compare(password, user.password))
    ) {
      console.log("Credenciais inválidas:", { email });
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error(
        "JWT secret is not defined. Please set JWT_SECRET in the environment variables."
      );
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "1h"
    });
    console.log("Token gerado:", token);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
