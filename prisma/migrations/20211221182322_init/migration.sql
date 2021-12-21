/*
  Warnings:

  - The primary key for the `CycleDock` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[ReferenceId]` on the table `CycleDock` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ReferenceId` to the `CycleDock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CycleDock` DROP PRIMARY KEY,
    ADD COLUMN `ReferenceId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`ReferenceId`);

-- CreateIndex
CREATE UNIQUE INDEX `CycleDock_ReferenceId_key` ON `CycleDock`(`ReferenceId`);
