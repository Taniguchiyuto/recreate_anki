/*
  Warnings:

  - Added the required column `did` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Card` ADD COLUMN `did` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_did_fkey` FOREIGN KEY (`did`) REFERENCES `Deck`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
