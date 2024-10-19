import { prisma } from "@root/prisma/prisma"
import { Prisma } from "@prisma/client"
import { Request, Response } from "express"
import { z } from "zod"

export async function createProduct(req: Request, res: Response) {
    try {
        const {
            categoryId,
            description,
            mainImage,
            name,
            otherImages,
            preparationDuration,
            price,
            rating,
            sizes,
        } = ProductSchema.parse(req.body)

        const product = await prisma.product.create({
            data: {
                categoryId,
                description,
                mainImage,
                sizes,
                name,
                otherImages,
                preparationDuration,
                price,
                rating,
            },
        })

        res.status(201).json(product)
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

// Zod schema for product validation
const ProductSchema = z.object({
    name: z.string().min(1),
    mainImage: z.string().url(),
    price: z.number().positive(),
    otherImages: z.array(z.string().url()).default([]),
    description: z.string().default(""),
    preparationDuration: z.string(),
    rating: z.number().min(0).max(5).default(5),
    sizes: z.array(z.string()).default([]),
    categoryId: z.number().int().positive(),
})
