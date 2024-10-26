import { prisma } from "@root/prisma/prisma"
import { Prisma } from "@prisma/client"
import { Request, Response } from "express"
import { z } from "zod"
const nodemailer = require("nodemailer")

export async function sendEmail(req: Request, res: Response) {
    try {
        const { email } = LoginSchema.parse(req.body)
        const customer = await prisma.customer.findUnique({
            where: { email },
        })

        if (!customer) {
            return res.status(400).json({ error: "Email is incorrect" })
        } else {
            const verificationCode = Math.floor(1000 + Math.random() * 9000)
            const expiryTime = new Date(Date.now() + 15 * 60 * 1000)

            await prisma.customer.update({
                where: { email },
                data: {
                    resetCode: verificationCode.toString(),
                    resetCodeExpiry: expiryTime,
                },
            })

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.PASS_USER,
                },
            })

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: customer.email,
                subject: "Reset Password",
                html: `<div><h4>${verificationCode}</h4></div>`,
            }

            try {
                const info = await transporter.sendMail(mailOptions)
                console.log("Email sent: " + info.response)
            } catch (err) {
                console.error("Error sending email:", err)
                return res.status(500).json({ error: "Failed to send email" })
            }
        }
        res.status(200).json({ res: "User found and reset code sent" })
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                errors: error.errors.map(
                    (err) => `${err.path.join(" / ")} ${err.message}`
                ),
            })
        } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(400).json({ error: error.message })
        } else {
            console.error(error)
            res.status(500).json({ error: "Internal server error" })
        }
    }
}

const LoginSchema = z.object({
    email: z.string().email("Invalid email address"),
})
