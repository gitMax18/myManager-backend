-- DropIndex
DROP INDEX `Product_shoppingListId_fkey` ON `product`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `category` ENUM('DRY', 'FRESH', 'HOUSEHOLD', 'FROZEN', 'BEVERAGE', 'HYGIENIC', 'UNKNOW') NOT NULL DEFAULT 'UNKNOW',
    ADD COLUMN `isInCart` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_shoppingListId_fkey` FOREIGN KEY (`shoppingListId`) REFERENCES `ShoppingList`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
