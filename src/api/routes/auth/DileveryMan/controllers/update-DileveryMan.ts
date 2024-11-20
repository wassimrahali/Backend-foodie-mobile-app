import { Request, Response } from "express";
import { prisma } from "@root/prisma/prisma";
import bcrypt from "bcrypt";

export async function updateDeliveryMan(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        if (!id) {
            throw new Error("Id must be a number");
        }

        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10); 
            req.body.password = hashedPassword;  
        }

        const updatedDeliveryMan = await prisma.dileveryMan.update({
            where: { id },
            data: req.body,
        });

        return res.send(updatedDeliveryMan);
    } catch (error) {
        console.error(error);  
        return res.status(500).send({ message: "An error occurred while updating the delivery man." });
    }
}
