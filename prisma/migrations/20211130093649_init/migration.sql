-- CreateTable
CREATE TABLE `User` (
    `RollNo` INTEGER NOT NULL,
    `Name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`RollNo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CycleStand` (
    `Id` VARCHAR(191) NOT NULL,
    `Location` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `CycleStand_Location_key`(`Location`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CycleDock` (
    `Bluetooth` VARCHAR(191) NOT NULL,
    `ReferenceId` VARCHAR(191) NOT NULL,
    `StandId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CycleDock_Bluetooth_key`(`Bluetooth`),
    UNIQUE INDEX `CycleDock_ReferenceId_key`(`ReferenceId`),
    PRIMARY KEY (`ReferenceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cycle` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Model` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsageHistory` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `CycleId` INTEGER NOT NULL,
    `UserRollNo` INTEGER NOT NULL,
    `StartTime` DATETIME(3) NOT NULL,
    `StartDock` VARCHAR(255) NOT NULL,
    `EndTime` DATETIME(3) NOT NULL,
    `EndDock` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CycleDock` ADD CONSTRAINT `CycleDock_StandId_fkey` FOREIGN KEY (`StandId`) REFERENCES `CycleStand`(`Location`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsageHistory` ADD CONSTRAINT `UsageHistory_CycleId_fkey` FOREIGN KEY (`CycleId`) REFERENCES `Cycle`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsageHistory` ADD CONSTRAINT `UsageHistory_UserRollNo_fkey` FOREIGN KEY (`UserRollNo`) REFERENCES `User`(`RollNo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsageHistory` ADD CONSTRAINT `UsageHistory_StartDock_fkey` FOREIGN KEY (`StartDock`) REFERENCES `CycleDock`(`StandId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsageHistory` ADD CONSTRAINT `UsageHistory_EndDock_fkey` FOREIGN KEY (`EndDock`) REFERENCES `CycleDock`(`StandId`) ON DELETE RESTRICT ON UPDATE CASCADE;
