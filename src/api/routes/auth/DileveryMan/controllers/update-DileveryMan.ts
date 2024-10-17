import { Request, Response } from "express"
import { prisma } from "@root/prisma/prisma"
export async function updateDeliveryMan(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        if (!id) {
            throw new Error("Id must be a number");
        }
        const updatedDeliveryMan = await prisma.dileveryMan.update({
            where: { id },
            data: req.body,
        });
        return res.send(updatedDeliveryMan);
    } catch (error) {
        throw new Error(error);
    }
}
