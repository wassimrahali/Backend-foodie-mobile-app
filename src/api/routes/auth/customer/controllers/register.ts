import { prisma } from "@root/prisma/prisma";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";

export async function registerCustomer(req: Request, res: Response) {
    try {
        const { phone,email, name, password } = CustomerSchema.parse(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);

        const customer = await prisma.customer.create({
            data: {
                phone,
                email,
                name,
                password: hashedPassword,
            },
        });

        res.status(201).json(customer);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                errors: error.errors.map(
                    (err) => `${err.path.join(" / ")} ${err.message}`
                ),
            });
        } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(400).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
const CustomerSchema = z.object({
    phone: z.string().min(1, "Phone number is required"),
    name: z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});
