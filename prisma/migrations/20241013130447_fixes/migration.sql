/*
  Warnings:

  - You are about to drop the column `phone` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Customer` table. All the data in the column will be lost.
  - The `salary` column on the `DileveryMan` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[email]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Admin_phone_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "phone",
ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "location";

-- AlterTable
ALTER TABLE "DileveryMan" DROP COLUMN "salary",
ADD COLUMN     "salary" DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "location" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "preparationDuration" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
