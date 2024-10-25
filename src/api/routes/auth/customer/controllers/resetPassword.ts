import { prisma } from "@root/prisma/prisma";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";



export async function resetPassword(req: Request, res: Response) {
  try {
    const { email, code } = ResetPasswordSchema.parse(req.body);

    const customer = await prisma.customer.findUnique({
      where: { email },
    });

    if (!customer) {
      return res.status(400).json({ error: "Email is incorrect" });
    }

    if (
      customer.resetCode !== code ||
      !customer.resetCodeExpiry ||
      new Date() > customer.resetCodeExpiry
    ) {
      return res.status(400).json({ error: "Invalid or expired reset code" });
    }
    res.status(200).json({ message: "Code Valid" });
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

const ResetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  code: z.string().min(4, "The reset code must be 4 digits").max(4, "The reset code must be 4 digits"),
});
