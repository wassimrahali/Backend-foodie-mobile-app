import express from "express";
import { getAllOrders } from "./controllers/all-orders";
import { createOrder } from "./controllers/create-order";
import { deleteOrder } from "./controllers/delete-order";
import { getOrderById } from "./controllers/one-order";
import { updateOrder } from "./controllers/update-order";
import { getLocation } from "./controllers/getLocation";
import { getOrderUserId } from "./controllers/getOrderUserId";
import { updateOrderStatus } from "./controllers/update-order-status";
import { getOrdersByStatus } from "./controllers/get-order-by-status";
import { getOrdersByDeliveryManId } from "./controllers/get-ordre-By-deliveryManId";

const orderRouter = express.Router();

orderRouter.get("/orders", getAllOrders);
orderRouter.get("/orders/:id", getOrderById);
orderRouter.get("/orders/location", getLocation); 
orderRouter.post("/orders", createOrder);
orderRouter.put("/orders/:id", updateOrder);
orderRouter.delete("/orders/:id", deleteOrder);
orderRouter.get("/orders/customer/:customerId", getOrderUserId);
orderRouter.patch("/orders/update-status/:id", updateOrderStatus);
orderRouter.get("/orders/status/:status", getOrdersByStatus); 
orderRouter.get("/orders/deliveryMan/:deliveryManId", getOrdersByDeliveryManId);

// Gestion des routes non trouvées
orderRouter.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default orderRouter;
