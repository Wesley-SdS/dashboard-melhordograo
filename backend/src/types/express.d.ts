import { User } from "../models/user"; // Importe o tipo User se você o tiver definido em outro lugar

declare global {
  namespace Express {
    interface Request {
      user?: User; // Ou qualquer tipo que você estiver usando para o usuário
    }
  }
}
