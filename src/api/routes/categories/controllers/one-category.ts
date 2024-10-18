import { Request, Response } from "express"
import { prisma } from "@root/prisma/prisma"

export async function getOneCategory(req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        if (!id) {
            throw new Error("Id must be a number")
        }
        const category = await prisma.category.findFirst({
            where: {
                id,
            },
            include: {
                products: true,
            },
        })
        return category
            ? res.send(category)
            : res.status(404).json({ message: "not found" })
    } catch (error) {
        throw new Error(error)
    }
}
