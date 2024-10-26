import { Response, Request } from "express";
import { prisma } from "@root/prisma/prisma";

export async function getAllOrders(req: Request, res: Response) {
    try {
        const orders = await prisma.order.findMany({
            include: {
                customer: true,
                deliveryMan: true,
                orderItems: true,
            },
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}







