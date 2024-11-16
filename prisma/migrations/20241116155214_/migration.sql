-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_deliveryManId_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "deliveryManId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_deliveryManId_fkey" FOREIGN KEY ("deliveryManId") REFERENCES "DileveryMan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
