import { Request, Response } from "express";
import { prisma } from "@root/prisma/prisma";

export async function deleteOrder(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const deletedOrderItem = await prisma.orderItem.deleteMany({
            where: { orderId: parseInt(id) },
        });

        
        const deletedOrder = await prisma.order.delete({
            where: { id: parseInt(id) },
        });

    
        res.status(200).json({ message: "Order deleted successfully", order: deletedOrder });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ error: error.message });
    }
}
