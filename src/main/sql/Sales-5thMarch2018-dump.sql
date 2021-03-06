-- MySQL dump 10.13  Distrib 5.7.21, for Win64 (x86_64)
--
-- Host: localhost    Database: sales
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `order_head`
--

DROP TABLE IF EXISTS `order_head`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_head` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `order_num` varchar(100) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `contact_num` int(11) NOT NULL DEFAULT '0',
  `email_id` varchar(100) DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  `billing_floor_num` int(11) NOT NULL DEFAULT '0',
  `billing_lift` tinyint(1) NOT NULL DEFAULT '0',
  `billing_add1` varchar(500) DEFAULT NULL,
  `billing_add2` varchar(500) DEFAULT NULL,
  `billing_add3` varchar(500) DEFAULT NULL,
  `billing_postal_code` int(11) DEFAULT NULL,
  `billing_city` varchar(100) DEFAULT NULL,
  `billing_state` varchar(100) DEFAULT NULL,
  `delivery_floor_num` int(11) NOT NULL DEFAULT '0',
  `delivery_lift` tinyint(1) NOT NULL DEFAULT '0',
  `delivery_add1` varchar(500) DEFAULT NULL,
  `delivery_add2` varchar(500) DEFAULT NULL,
  `delivery_add3` varchar(500) DEFAULT NULL,
  `delivery_postal_code` int(11) DEFAULT NULL,
  `delivery_city` varchar(100) DEFAULT NULL,
  `delivery_state` varchar(100) DEFAULT NULL,  
  `created_by` int(11) DEFAULT NULL COMMENT 'REF user.id',  
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `order_head_created_by_fk` (`created_by`),
  CONSTRAINT `order_head_created_by_fk` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1430 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sku_stock_master`
--

DROP TABLE IF EXISTS `sku_stock_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sku_stock_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `sku` varchar(500) NOT NULL,
  `product_name` varchar(500) NOT NULL,
  `product_description` varchar(100) DEFAULT NULL,
  `color` varchar(100) DEFAULT NULL,
  `t48_stock` int(11) DEFAULT '0',
  `nimji_stock` int(11) DEFAULT '0',
  `total_stock` int(11) DEFAULT '0',
  `price` double DEFAULT '0',  
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=409 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `setting`
--

DROP TABLE IF EXISTS `setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `setting_key` varchar(100) NOT NULL COMMENT 'JAVA ENUM com.spacewood.sales.setting.SettingKey',
  `setting_value` varchar(100) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `setting_setting_key_unique` (`setting_key`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setting`
--

LOCK TABLES `setting` WRITE;
/*!40000 ALTER TABLE `setting` DISABLE KEYS */;
INSERT INTO `setting` VALUES (1,'ATTACHMENT_ROOT_PATH','/home/innocal/salesdoc','attachments',0),(2,'DOWNLOAD_ROOT_PATH','C:\\Users\\webdesign\\Downloads','attachments',0);
/*!40000 ALTER TABLE `setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL COMMENT 'JAVA ENUM com.sales.user.Role',
  `name` varchar(100) DEFAULT NULL,
  `mobile_no` varchar(100) DEFAULT '0',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_username_unique` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=409 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (408,'admin','admin','ROLE_ADMIN','Admin','978648968',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-05 17:32:18
