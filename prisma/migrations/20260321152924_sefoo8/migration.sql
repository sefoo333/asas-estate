/*
  Warnings:

  - You are about to drop the column `user` on the `RealEstate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RealEstate" DROP COLUMN "user",
ADD COLUMN     "status" TEXT DEFAULT 'active';

-- CreateTable
CREATE TABLE "_RealEstateToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RealEstateToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_RealEstateToUser_B_index" ON "_RealEstateToUser"("B");

-- AddForeignKey
ALTER TABLE "_RealEstateToUser" ADD CONSTRAINT "_RealEstateToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "RealEstate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RealEstateToUser" ADD CONSTRAINT "_RealEstateToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
