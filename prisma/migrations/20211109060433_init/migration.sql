-- CreateTable
CREATE TABLE `CycleStand` (
    `id` VARCHAR(191) NOT NULL,
    `location` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `CycleStand_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CycleDock` (
    `id` VARCHAR(191) NOT NULL,
    `cycleStandId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CycleDock_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CycleDock` ADD CONSTRAINT `CycleDock_cycleStandId_fkey` FOREIGN KEY (`cycleStandId`) REFERENCES `CycleStand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
