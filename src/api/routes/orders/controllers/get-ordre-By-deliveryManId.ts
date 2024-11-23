import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getOrdersByDeliveryManId = async (req: Request, res: Response) => {
  const { deliveryManId } = req.params;

  if (!deliveryManId) {
    return res.status(400).json({ error: "DeliveryMan ID is required" });
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        deliveryManId: parseInt(deliveryManId, 10), // Ensure it's parsed as an integer
      },
      include: {
        customer: true,
        deliveryMan: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this delivery man" });
    }

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders by deliveryManId:", error);
    res.status(500).json({ error: "Error fetching orders by deliveryManId" });
  } finally {
    await prisma.$disconnect();
  }
};
