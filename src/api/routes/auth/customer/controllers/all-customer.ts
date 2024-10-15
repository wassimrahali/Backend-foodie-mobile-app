import { Response, Request } from "express"
import { prisma } from "@root/prisma/prisma"

export async function getAllcustomers(req: Request, res: Response) {
    try {
        const customers = await prisma.customer.findMany()
        res.send(customers)
        return
    } catch (error) {
        throw new Error(error)
    }
}