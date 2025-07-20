-- AlterTable
ALTER TABLE `Category` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `deletedAt` DATETIME(3) NULL;
