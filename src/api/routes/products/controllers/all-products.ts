import { Response, Request } from "express"
import { prisma } from "@root/prisma/prisma"

export async function getAllProducts(req: Request, res: Response) {
    try {
        const products = await prisma.product.findMany({
            include: { category: true },
        })
        res.send(products)
        return
    } catch (error) {
        throw new Error(error)
    }
}
