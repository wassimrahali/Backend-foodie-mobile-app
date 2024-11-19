import { prisma } from "@root/prisma/prisma";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function signOut(req: Request, res: Response) {
    try {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(400).json({ error: "No token provided" });
        }

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secretKey");

        const user = await prisma.customer.findUnique({
            where: { id: decoded.id }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            message: "Successfully logged out",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                createdAt: user.createdAt,
            }
        });

      

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User has signed out"
    });
};