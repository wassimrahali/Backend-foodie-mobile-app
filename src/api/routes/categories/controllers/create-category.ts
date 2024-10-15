import { prisma } from "@root/prisma/prisma"
import { Prisma } from "@prisma/client"
import { Request, Response } from "express"
import { z } from "zod"

export async function createCategory(req: Request, res: Response) {
    try {
        const { image, name } = CategorySchema.parse(req.body)

        const category = await prisma.category.create({
            data: {
                image,
                name,
            },
        })

        res.status(201).json(category)
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

// Zod schema for category validation
const CategorySchema = z.object({
    name: z.string(),
    image: z.string(),
})
