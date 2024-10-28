import { Request, Response } from "express"
import { prisma } from "@root/prisma/prisma"

export async function getOrderById(req: Request, res: Response) {
    try {
        const { id } = req.params
        const order = await prisma.order.findUnique({
            where: { id: parseInt(id) },
            include: {
                customer: true,
                deliveryMan: true,
                orderItems: {
                    include: {
                        product: true,
                    },
                },
            },
        })
        if (!order) {
            return res.status(404).json({ error: "Order not found" })
        }
        res.json(order)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
