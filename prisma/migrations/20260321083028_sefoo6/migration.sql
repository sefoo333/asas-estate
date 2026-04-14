-- CreateTable
CREATE TABLE "Favourites" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favourites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favourites_userId_productId_key" ON "Favourites"("userId", "productId");

-- AddForeignKey
ALTER TABLE "Favourites" ADD CONSTRAINT "Favourites_productId_fkey" FOREIGN KEY ("productId") REFERENCES "RealEstate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
