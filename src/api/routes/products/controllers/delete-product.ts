import { Request, Response } from "express"
import { prisma } from "@root/prisma/prisma"

export async function deleteProduct(req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        if (!id) {
            throw new Error("Id must be a number")
        }
        const product = await prisma.product.delete({
            where: {
                id,
            },
        })
        return product
            ? res.send(product)
            : res.status(404).json({ message: "not found" })
    } catch (error) {
        throw new Error(error)
    }
}
