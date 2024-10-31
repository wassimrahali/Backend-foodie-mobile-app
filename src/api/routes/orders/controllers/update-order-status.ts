import { prisma } from "@root/prisma/prisma"
import { ALL_ORDER_STATUS } from "@root/src/constants/all-order-status"
import { Request, Response } from "express"

export async function updateOrderStatus(req: Request, res: Response) {
    try {
        const { id } = req.params
        const { status } = req.body
        if (!ALL_ORDER_STATUS.includes(status)) {
            return res.status(400).send({
                error: "status is not valid",
            })
        }

        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(id) },
            data: {
                status,
            },
            include: { orderItems: true, customer: true, deliveryMan: true },
        })
        res.json(updatedOrder)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
