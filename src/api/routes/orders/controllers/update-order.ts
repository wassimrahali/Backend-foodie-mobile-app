import { prisma } from "@root/prisma/prisma"
import { Request, Response } from "express"

export async function updateOrder(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { totalPrice, status, location, customerId, deliveryManId, orderItems } = req.body;

        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(id) },
            data: {
                totalPrice,
                status,
                location,
                customer: { connect: { id: customerId } },
                deliveryMan: { connect: { id: deliveryManId } },
                orderItems: {
                    deleteMany: {}, // Clears existing order items for replacement
                    create: orderItems.map((item: any) => ({
                        quantity: item.quantity,
                        product: { connect: { id: item.productId } },
                    })),
                },
            },
            include: { orderItems: true, customer: true, deliveryMan: true },
        });
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

