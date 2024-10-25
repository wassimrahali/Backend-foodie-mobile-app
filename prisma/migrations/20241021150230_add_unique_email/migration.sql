/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "resetCode" TEXT,
ADD COLUMN     "resetCodeExpiry" TIMESTAMP(3),
ALTER COLUMN "name" DROP DEFAULT,
ALTER COLUMN "email" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");
