import express from "express";
import { getAllOrders } from "./controllers/all-orders";
import { createOrder } from "./controllers/create-order";
import { deleteOrder } from "./controllers/delete-order";
import { getOrderById } from "./controllers/one-order";
import { updateOrder } from "./controllers/update-order";

const orderRouter = express.Router();

orderRouter.get("/orders", getAllOrders);
orderRouter.get("/orders/:id", getOrderById);
orderRouter.post("/orders", createOrder);
orderRouter.put("/orders/:id", updateOrder);
orderRouter.delete("/orders/:id", deleteOrder);

export default orderRouter;
