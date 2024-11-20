import { prisma } from "@root/prisma/prisma";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function signOutDileveryMan(req: Request, res: Response) {
    try {
        // Extract the token from the authorization header
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(400).json({ error: "No token provided" });
        }

        // Verify the token
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secretKey");

        // Find the delivery man using the decoded token's ID
        const dileveryMan = await prisma.dileveryMan.findUnique({
            where: { id: decoded.id },
        });

        if (!dileveryMan) {
            return res.status(404).json({ error: "Delivery man not found" });
        }

        // Clear the token or instruct the client to do so
        res.clearCookie("token"); // Optional: if using cookies
        res.status(200).json({
            message: "Successfully logged out",
            dileveryMan: {
                id: dileveryMan.id,
                name: dileveryMan.name,
                phone: dileveryMan.phone,
                createdAt: dileveryMan.createdAt,
            },
        });
    } catch (error) {
        console.error(error);

        // Handle specific JWT errors
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Invalid token" });
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token has expired" });
        }

        res.status(500).json({ error: "Internal server error" });
    }
}
