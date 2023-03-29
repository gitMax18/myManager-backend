/*
  Warnings:

  - You are about to drop the `shoppingrow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `shoppingrow`;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `shoppingListId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_shoppingListId_fkey` FOREIGN KEY (`shoppingListId`) REFERENCES `ShoppingList`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
