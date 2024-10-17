import { Response, Request } from "express"
import { prisma } from "@root/prisma/prisma"

export async function getAllCategories(req: Request, res: Response) {
    try {
        const categories = await prisma.category.findMany({
            include: {
                products: true,
            },
        })
        res.send(categories)
        return
    } catch (error) {
        throw new Error(error)
    }
}
