import { Request, Response } from "express"
import { prisma } from "@root/prisma/prisma"

export async function deleteDeliveryMan(req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json({ message: "Id must be a valid number" })
        }
        const deliveryMan = await prisma.dileveryMan.delete({
            where: { id },
        })
        return res.status(200).json({ message: "DeliveryMan deleted successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Error deleting DeliveryMan", error: error.message })
    }
}
