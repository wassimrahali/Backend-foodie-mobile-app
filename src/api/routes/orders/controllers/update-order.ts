import { prisma } from "@root/prisma/prisma"
import { Request, Response } from "express"
export async function updateOrder(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { status, deliveryManId } = req.body;

        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(id) },
            data: {
                status,
                deliveryMan: deliveryManId ? { connect: { id: deliveryManId } } : undefined,
            },
            include: { orderItems: true, customer: true, deliveryMan: true },
        });

        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
