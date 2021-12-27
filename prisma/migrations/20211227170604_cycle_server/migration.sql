/*
  Warnings:

  - You are about to alter the column `StartDock` on the `UsageHistory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `EndDock` on the `UsageHistory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - A unique constraint covering the columns `[Id]` on the table `CycleStand` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `CycleDock` DROP FOREIGN KEY `CycleDock_StandId_fkey`;

-- DropForeignKey
ALTER TABLE `UsageHistory` DROP FOREIGN KEY `UsageHistory_EndDock_fkey`;

-- DropForeignKey
ALTER TABLE `UsageHistory` DROP FOREIGN KEY `UsageHistory_StartDock_fkey`;

-- DropIndex
DROP INDEX `CycleStand_Location_key` ON `CycleStand`;

-- AlterTable
ALTER TABLE `UsageHistory` MODIFY `StartDock` VARCHAR(191) NOT NULL,
    MODIFY `EndDock` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `CycleStand_Id_key` ON `CycleStand`(`Id`);

-- AddForeignKey
ALTER TABLE `CycleDock` ADD CONSTRAINT `CycleDock_StandId_fkey` FOREIGN KEY (`StandId`) REFERENCES `CycleStand`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsageHistory` ADD CONSTRAINT `UsageHistory_StartDock_fkey` FOREIGN KEY (`StartDock`) REFERENCES `CycleDock`(`StandId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsageHistory` ADD CONSTRAINT `UsageHistory_EndDock_fkey` FOREIGN KEY (`EndDock`) REFERENCES `CycleDock`(`StandId`) ON DELETE RESTRICT ON UPDATE CASCADE;
