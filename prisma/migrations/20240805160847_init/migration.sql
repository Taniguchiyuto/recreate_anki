-- CreateTable
CREATE TABLE `Note` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `guid` VARCHAR(255) NOT NULL,
    `mid` INTEGER NOT NULL,
    `mod` INTEGER NOT NULL,
    `usn` INTEGER NOT NULL,
    `tags` TEXT NULL,
    `flds` TEXT NULL,
    `sfld` VARCHAR(191) NULL,
    `csum` INTEGER NOT NULL,
    `flags` INTEGER NULL,
    `data` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Card` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nid` INTEGER NOT NULL,
    `ord` INTEGER NOT NULL,
    `mod` INTEGER NOT NULL,
    `usn` INTEGER NOT NULL,
    `type` INTEGER NOT NULL,
    `queue` INTEGER NOT NULL,
    `due` INTEGER NOT NULL,
    `ivl` DOUBLE NULL,
    `factor` DOUBLE NULL,
    `reps` INTEGER NULL,
    `lapses` INTEGER NULL,
    `left` INTEGER NULL,
    `odue` INTEGER NULL,
    `odid` INTEGER NULL,
    `flags` INTEGER NULL,
    `data` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Col` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `crt` INTEGER NOT NULL,
    `mod` INTEGER NOT NULL,
    `scm` INTEGER NOT NULL,
    `ver` INTEGER NOT NULL,
    `dty` INTEGER NOT NULL,
    `usn` INTEGER NOT NULL,
    `ls` INTEGER NOT NULL,
    `conf` TEXT NOT NULL,
    `models` TEXT NOT NULL,
    `decks` TEXT NOT NULL,
    `dconf` TEXT NOT NULL,
    `tags` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Model` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `flds` JSON NOT NULL,
    `templates` JSON NOT NULL,
    `css` VARCHAR(191) NOT NULL,
    `conf` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Revlog` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `cid` INTEGER NOT NULL,
    `usn` INTEGER NOT NULL,
    `ease` INTEGER NOT NULL,
    `ivl` INTEGER NOT NULL,
    `lastIvl` INTEGER NOT NULL,
    `factor` INTEGER NOT NULL,
    `time` INTEGER NOT NULL,
    `type` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_mid_fkey` FOREIGN KEY (`mid`) REFERENCES `Model`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_nid_fkey` FOREIGN KEY (`nid`) REFERENCES `Note`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Revlog` ADD CONSTRAINT `Revlog_cid_fkey` FOREIGN KEY (`cid`) REFERENCES `Card`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
