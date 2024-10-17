import { Request, Response } from "express";
import { prisma } from "@root/prisma/prisma";
import bcrypt from "bcrypt";

export async function updateCustomer(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Id must be a valid number" });
        }

        const { name, email, phone, password } = req.body;
        const data: { name?: string; email?: string; phone?: string; password?: string } = {};

        if (name) data.name = name;
        if (email) data.email = email;
        if (phone) data.phone = phone;
        if (password) data.password = await bcrypt.hash(password, 10);

        const customer = await prisma.customer.update({
            where: { id },
            data,
        });

        return res.status(200).json(customer);
    } catch (error) {
        return res.status(500).json({ message: "Error updating Customer", error: error.message });
    }
}
