import { Request, Response } from "express"
import { prisma } from "@root/prisma/prisma"

export async function getOneDileveryMan(req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        if (!id) {
            throw new Error("Id must be a number")
        }
        const DileveryMan = await prisma.dileveryMan.findFirst({
            where: {
                id,
            },
        })
        return DileveryMan
            ? res.send(DileveryMan)
            : res.status(404).json({ message: "DileveryMan not found" })
    } catch (error) {
        throw new Error(error)
    }
}
