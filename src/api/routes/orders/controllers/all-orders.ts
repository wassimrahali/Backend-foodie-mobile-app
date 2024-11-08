import { Response, Request } from "express"
import { prisma } from "@root/prisma/prisma"

export async function getAllOrders(req: Request, res: Response) {
    try {
        const { searchValue } = req.query

        const orders = await prisma.order.findMany({
            where: searchValue
                ? {
                      OR: [
                          {
                              customer: {
                                  name: {
                                      contains: String(searchValue),
                                      mode: "insensitive",
                                  },
                              },
                          },
                      ],
                  }
                : undefined,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                customer: true,
                deliveryMan: true,
                orderItems: {
                    include: {
                        product: true,
                    },
                },
            },
        })
        res.json(orders)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
