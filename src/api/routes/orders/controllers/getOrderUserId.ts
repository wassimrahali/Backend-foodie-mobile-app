import { Request, Response } from "express"
import { prisma } from "@root/prisma/prisma"

export async function getOrderUserId(req: Request, res: Response) {
    try {
        const { customerId } = req.params
        const orders = await prisma.order.findMany({
            where: { customerId: parseInt(customerId) },
            include: {
                orderItems: {
                    include: {
                        product: true,
                    },
                },
            },
        })
        if (!orders.length) {
            return res.status(404).json({ error: "No orders found for this customer" })
        }
        res.json(orders)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
