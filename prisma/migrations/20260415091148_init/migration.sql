/*
  Warnings:

  - You are about to drop the column `rating` on the `Broker` table. All the data in the column will be lost.
  - You are about to drop the `_RealEstateToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RealEstateToUser" DROP CONSTRAINT "_RealEstateToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_RealEstateToUser" DROP CONSTRAINT "_RealEstateToUser_B_fkey";

-- AlterTable
ALTER TABLE "Broker" DROP COLUMN "rating",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "ratingSum" INTEGER;

-- AlterTable
ALTER TABLE "RealEstate" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT,
ADD COLUMN     "location" TEXT DEFAULT 'un',
ADD COLUMN     "locationCode" TEXT DEFAULT 'un',
ADD COLUMN     "phoneCode" TEXT,
ADD COLUMN     "provider" TEXT,
ALTER COLUMN "password" DROP NOT NULL;

-- DropTable
DROP TABLE "_RealEstateToUser";

-- CreateTable
CREATE TABLE "RequestBroker" (
    "id" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "languages" TEXT[],
    "image" TEXT,
    "phone" TEXT,
    "location" TEXT NOT NULL DEFAULT 'egypt',
    "bio" TEXT,
    "locationCode" TEXT NOT NULL DEFAULT 'eg',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RequestBroker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "massege" TEXT NOT NULL,
    "idTo" TEXT,
    "status" TEXT DEFAULT 'not Replied',
    "productId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notfication" (
    "id" TEXT NOT NULL,
    "From" TEXT NOT NULL,
    "To" TEXT NOT NULL,
    "Content" JSONB NOT NULL,
    "linkNotifaction" TEXT NOT NULL,

    CONSTRAINT "Notfication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rate" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "BrokerId" TEXT NOT NULL,
    "massege" TEXT,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rate_userId_BrokerId_key" ON "Rate"("userId", "BrokerId");

-- AddForeignKey
ALTER TABLE "RealEstate" ADD CONSTRAINT "RealEstate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Broker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_productId_fkey" FOREIGN KEY ("productId") REFERENCES "RealEstate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notfication" ADD CONSTRAINT "Notfication_To_fkey" FOREIGN KEY ("To") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notfication" ADD CONSTRAINT "Notfication_From_fkey" FOREIGN KEY ("From") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rate" ADD CONSTRAINT "Rate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rate" ADD CONSTRAINT "Rate_BrokerId_fkey" FOREIGN KEY ("BrokerId") REFERENCES "Broker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
