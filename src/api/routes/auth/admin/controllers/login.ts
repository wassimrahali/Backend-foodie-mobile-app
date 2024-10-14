import { prisma } from "@root/prisma/prisma";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function loginadmin(req: Request, res: Response) {
    try {
        const { email, password } = LoginSchema.parse(req.body);
        const admin = await prisma.admin.findUnique({
            where: { email },
        });

        if (!admin) {
            return res.status(400).json({ error: "email address is incorrect" });
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "password is incorrect" });
        }
        const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET || "secretKey", {
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
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});
