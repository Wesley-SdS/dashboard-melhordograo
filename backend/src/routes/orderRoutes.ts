import express from "express";
import authenticateToken from "../middleware/authToken";
import {
  getOrders,
  getOrderById,
  updateOrderStatus
} from "../controllers/order/orderController";

const router = express.Router();

router.get("/orders", authenticateToken, getOrders);
router.get("/orders/:id", authenticateToken, getOrderById);
router.put("/orders/:id/status", authenticateToken, updateOrderStatus);

export default router;
