import { PrismaClient, Status } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getOrdersByStatus = async (req: Request, res: Response) => {
  const { status } = req.params;

  if (!Object.values(Status).includes(status as Status)) {
    return res.status(400).json({ error: "Invalid status parameter" });
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        status: status as Status,
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

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders by status:", error);
    res.status(500).json({ error: "Error fetching orders by status" });
  } finally {
    await prisma.$disconnect();
  }
};
