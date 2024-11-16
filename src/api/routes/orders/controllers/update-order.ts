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
                customer: customerId ? { connect: { id: customerId } } : undefined,
                deliveryMan: deliveryManId ? { connect: { id: deliveryManId } } : undefined,
                orderItems: orderItems?.length > 0
                    ? {
                        deleteMany: {}, // Clears existing order items for replacement
                        create: orderItems.map((item: any) => ({
                            quantity: item.quantity,
                            product: { connect: { id: item.productId } },
                        })),
                    }
                    : undefined,
            },
            include: { orderItems: true, customer: true, deliveryMan: true },
        });
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
