CREATE DATABASE `to_do` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE TABLE `daily_task` (
  `taskId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `type` enum('ADHOC','SCHEDULED','RECURRING') NOT NULL DEFAULT 'ADHOC',
  `name` text NOT NULL,
  `isDone` tinyint NOT NULL DEFAULT '0',
  `date` date NOT NULL,
  `createdTime` bigint NOT NULL,
  `modifiedTime` bigint NOT NULL,
  `isActive` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`taskId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `recurring_task` (
  `taskId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `name` text NOT NULL,
  `createdTime` bigint NOT NULL,
  `modifiedTime` bigint NOT NULL,
  `isActive` tinyint NOT NULL DEFAULT '1',
  `frequency` int DEFAULT NULL,
  PRIMARY KEY (`taskId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;