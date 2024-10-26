import { prisma } from "@root/prisma/prisma"
import { Prisma } from "@prisma/client"
import { Request, Response } from "express"
import { z } from "zod"

export async function createOrder(req: Request, res: Response) {
    try {
        const { totalPrice, status, location, customerId, deliveryManId, orderItems } = req.body;
        const newOrder = await prisma.order.create({
            data: {
                totalPrice,
                status,
                location,
                customer: { connect: { id: customerId } },
                deliveryMan: { connect: { id: deliveryManId } },
                orderItems: {
                    create: orderItems.map((item: any) => ({
                        quantity: item.quantity,
                        product: { connect: { id: item.productId } },
                    })),
                },
            },
            include: { orderItems: true, customer: true, deliveryMan: true },
        });
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}