import { Request, Response } from "express"
import { prisma } from "@root/prisma/prisma"


export async function updateCustomer(req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json({ message: "Id must be a valid number" })
        }
        const { name, email, phone, password } = req.body
        const customer = await prisma.customer.update({
            where: { id },
            data: { name, email, phone, password },
        })
        return res.status(200).json(customer)
    } catch (error) {
        return res.status(500).json({ message: "Error updating Customer", error: error.message })
    }
}

