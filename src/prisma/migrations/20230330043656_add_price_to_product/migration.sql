-- DropIndex
DROP INDEX `Product_shoppingListId_fkey` ON `product`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `price` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_shoppingListId_fkey` FOREIGN KEY (`shoppingListId`) REFERENCES `ShoppingList`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
