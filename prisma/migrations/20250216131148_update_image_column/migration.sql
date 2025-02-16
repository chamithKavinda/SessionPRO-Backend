-- CreateTable
CREATE TABLE `Session` (
    `sessionID` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `date` DATE NOT NULL,
    `time` TIME NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `duration` VARCHAR(50) NULL,
    `speakerName` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`sessionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Speaker` (
    `name` VARCHAR(255) NOT NULL,
    `bio` TEXT NULL,
    `expertise` VARCHAR(255) NULL,
    `image` TEXT NOT NULL,
    `speakerEmail` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Speaker_speakerEmail_key`(`speakerEmail`),
    PRIMARY KEY (`speakerEmail`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `email` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
