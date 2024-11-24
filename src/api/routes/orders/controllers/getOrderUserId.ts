import { Request, Response } from "express";
import { prisma } from "@root/prisma/prisma";

export async function getOrderUserId(req: Request, res: Response) {
    try {
        const { customerId } = req.params;
        const orders = await prisma.order.findMany({
            where: { customerId: parseInt(customerId) },
            include: {
                orderItems: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
