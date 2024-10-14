import { prisma } from "@root/prisma/prisma";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function loginDileveryMan(req: Request, res: Response) {
    try {
        const { phone, password } = LoginSchema.parse(req.body);
        const DileveryMan = await prisma.dileveryMan.findUnique({
            where: { phone },
        });

        if (!DileveryMan) {
            return res.status(400).json({ error: "Phone number or password is incorrect" });
        }
        const isPasswordValid = await bcrypt.compare(password, DileveryMan.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Phone number or password is incorrect" });
        }
        const token = jwt.sign({ id: DileveryMan.id }, process.env.JWT_SECRET || "secretKey", {
            expiresIn: "1h",
        });

        res.status(200).json({ token });
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
const LoginSchema = z.object({
    phone: z.string().min(1, "Phone number is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});
