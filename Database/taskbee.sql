/*
Navicat MySQL Data Transfer

Source Server         : dev
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2015-10-07 21:58:38
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `accountId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `passwordHash` varchar(255) NOT NULL,
  PRIMARY KEY (`accountId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for environment
-- ----------------------------
DROP TABLE IF EXISTS `environment`;
CREATE TABLE `environment` (
  `environmentId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`environmentId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for event
-- ----------------------------
DROP TABLE IF EXISTS `event`;
CREATE TABLE `event` (
  `eventId` int(11) NOT NULL AUTO_INCREMENT,
  `environmentId` int(11) NOT NULL,
  `startTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `endTime` datetime DEFAULT NULL,
  `totalTime` int(11) DEFAULT '0',
  `sessionId` int(11) NOT NULL,
  PRIMARY KEY (`eventId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for session
-- ----------------------------
DROP TABLE IF EXISTS `session`;
CREATE TABLE `session` (
  `sessionId` int(11) NOT NULL AUTO_INCREMENT,
  `startTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `endTime` datetime DEFAULT NULL,
  `timeOnTask` int(11) DEFAULT '0',
  `timeOffTask` int(11) DEFAULT '0',
  `sessionPercent` int(11) DEFAULT '0',
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`sessionId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for task
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `taskId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `priority` int(11) NOT NULL,
  `dueDate` datetime NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT '0',
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`taskId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for taskgoal
-- ----------------------------
DROP TABLE IF EXISTS `taskgoal`;
CREATE TABLE `taskgoal` (
  `taskGoalId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `tasksCompleted` int(11) NOT NULL,
  `sessionId` int(11) NOT NULL,
  PRIMARY KEY (`taskGoalId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for timegoal
-- ----------------------------
DROP TABLE IF EXISTS `timegoal`;
CREATE TABLE `timegoal` (
  `timeGoalId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `targetPercent` int(11) NOT NULL,
  `actualPercent` int(11) DEFAULT '0',
  PRIMARY KEY (`timeGoalId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for timeperiod
-- ----------------------------
DROP TABLE IF EXISTS `timeperiod`;
CREATE TABLE `timeperiod` (
  `timePeriodId` int(11) NOT NULL AUTO_INCREMENT,
  `daysOfWeek` varchar(255) NOT NULL,
  `startTime` int(11) NOT NULL,
  `endTime` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`timePeriodId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `totalTimeWork` int(11) DEFAULT '0',
  `currentPercent` int(11) DEFAULT '0',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for website
-- ----------------------------
DROP TABLE IF EXISTS `website`;
CREATE TABLE `website` (
  `websiteId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `domainName` varchar(255) NOT NULL,
  `lastAccessed` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `environmentId` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  PRIMARY KEY (`websiteId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
