import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Count the orders assigned to a delivery man
export const getOrdersCount = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const ordersCount = await prisma.order.count({
            where: { deliveryManId: parseInt(id) },
        });

        res.json({ deliveryManId: id, ordersCount });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching orders count.' });
    }
};

// Get accepted, refused orders, and total price
export const getOrdersSummary = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Fetch accepted orders (DELIVERED)
        const acceptedOrders = await prisma.order.count({
            where: {
                deliveryManId: parseInt(id),
                status: 'DELIVERED',
            },
        });

        // Fetch refused orders (RETURNED)
        const refusedOrders = await prisma.order.count({
            where: {
                deliveryManId: parseInt(id),
                status: 'RETURNED',
            },
        });

        // Calculate total price for delivered orders
        const totalPrice = await prisma.order.aggregate({
            _sum: {
                totalPrice: true,
            },
            where: {
                deliveryManId: parseInt(id),
                status: 'DELIVERED',
            },
        });

        res.json({
            deliveryManId: id,
            acceptedOrders,
            refusedOrders,
            totalPrice: totalPrice._sum.totalPrice || 0,
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching orders summary.' });
    }
};
