import { Response, Request } from "express"
import { prisma } from "@root/prisma/prisma"

export async function getAllDileveryMans(req: Request, res: Response) {
    try {
        const DileveryMans = await prisma.dileveryMan.findMany()
        res.send(DileveryMans)
        return
    } catch (error) {
        throw new Error(error)
    }
}