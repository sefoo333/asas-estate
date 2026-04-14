-- AlterTable
ALTER TABLE "Broker" ADD COLUMN     "locationCode" TEXT NOT NULL DEFAULT 'eg',
ALTER COLUMN "location" SET DEFAULT 'egypt';
