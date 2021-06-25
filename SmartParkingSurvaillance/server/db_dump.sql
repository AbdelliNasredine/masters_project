CREATE DATABASE  IF NOT EXISTS `fog_smart_parking_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `fog_smart_parking_db`;
-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: fog_smart_parking_db
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `driver`
--

DROP TABLE IF EXISTS `driver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `driver` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `phoneNumber` varchar(10) NOT NULL,
  `profilePicture` varchar(255) DEFAULT NULL,
  `balance` double NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `driver_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver`
--

LOCK TABLES `driver` WRITE;
/*!40000 ALTER TABLE `driver` DISABLE KEYS */;
/*!40000 ALTER TABLE `driver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parking`
--

DROP TABLE IF EXISTS `parking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `parking` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `rentPrice` double NOT NULL DEFAULT '0',
  `authorizedVehicles` json DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `lat` double NOT NULL,
  `lon` double NOT NULL,
  `description` text,
  `parkingSpots` json DEFAULT NULL,
  `reservedSpots` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parking`
--

LOCK TABLES `parking` WRITE;
/*!40000 ALTER TABLE `parking` DISABLE KEYS */;
INSERT INTO `parking` VALUES (1,'University of Bechar Parking Area',100,'[\"17737 111 16\"]','B.P 417 route kenadsa',31.6,-2.23,'The main unsiversity parking area','[{\"id\": 1}, {\"id\": 2}, {\"id\": 3}, {\"id\": 4}, {\"id\": 5}, {\"id\": 6}, {\"id\": 7}, {\"id\": 8}, {\"id\": 9}, {\"id\": 10}]','[{\"driver_id\": 2, \"reservation_id\": 18}]'),(2,'Bechar Djadid Parking Area ',50,NULL,'Bechar Djadid 08005 ',31.56332890453405,-2.235416775079036,'The Parking Area of Bechar Djadid','[{\"id\": 1}, {\"id\": 2}, {\"id\": 3}, {\"id\": 4}]',NULL),(4,'Testing',100,NULL,'Test',-20,56,'Testing','[{\"id\": 1}, {\"id\": 2}, {\"id\": 3}, {\"id\": 4}, {\"id\": 5}, {\"id\": 6}, {\"id\": 7}, {\"id\": 8}, {\"id\": 9}, {\"id\": 10}, {\"id\": 11}, {\"id\": 12}]',NULL);
/*!40000 ALTER TABLE `parking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `amount` double NOT NULL DEFAULT '0',
  `status` varchar(45) NOT NULL,
  `reservation_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reservation_id` (`reservation_id`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_status`
--

DROP TABLE IF EXISTS `payment_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `payment_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_status`
--

LOCK TABLES `payment_status` WRITE;
/*!40000 ALTER TABLE `payment_status` DISABLE KEYS */;
INSERT INTO `payment_status` VALUES (4,'UNPAIED'),(5,'PAIED'),(6,'PENDING');
/*!40000 ALTER TABLE `payment_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `reservation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `driver_id` int(11) NOT NULL,
  `spot_id` int(11) NOT NULL,
  `amount` double DEFAULT NULL,
  `parking_id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES (1,'2021-06-02 03:14:07','2021-06-02 04:14:07',2,2,500,0,1),(10,'2021-06-07 16:35:43','2021-06-07 17:25:03',10,2,100,1,1),(11,'2021-06-07 17:26:43','2021-06-07 17:40:12',10,3,100,1,1),(12,'2021-06-07 17:41:14','2021-06-07 17:42:27',10,1,100,1,1),(13,'2021-06-07 17:51:09','2021-06-10 08:33:18',10,1,100,1,1),(16,'2021-06-10 08:36:46','2021-06-10 08:40:23',10,1,100,1,1),(17,'2021-06-19 10:20:56','2021-06-19 10:29:38',2,1,100,1,1),(18,'2021-06-19 10:33:38',NULL,2,1,100,1,1);
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'DRIVER'),(2,'ADMIN');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spot`
--

DROP TABLE IF EXISTS `spot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `spot` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slotNumber` int(11) NOT NULL,
  `status` varchar(45) NOT NULL,
  `parking_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `parking_id` (`parking_id`),
  CONSTRAINT `spot_ibfk_1` FOREIGN KEY (`parking_id`) REFERENCES `parking` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spot`
--

LOCK TABLES `spot` WRITE;
/*!40000 ALTER TABLE `spot` DISABLE KEYS */;
/*!40000 ALTER TABLE `spot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spot_status`
--

DROP TABLE IF EXISTS `spot_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `spot_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spot_status`
--

LOCK TABLES `spot_status` WRITE;
/*!40000 ALTER TABLE `spot_status` DISABLE KEYS */;
INSERT INTO `spot_status` VALUES (1,'OCCUPIED'),(2,'FREE');
/*!40000 ALTER TABLE `spot_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(45) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `isVerified` tinyint(1) DEFAULT '0',
  `userInfo` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'nasredine','$2b$10$q5eo7w9M66.SMQ8AAnxjA.WWoRpS8BcqCPcdjs4a3k7zivliX/ZJy','admin','2021-05-17 22:02:34','2021-06-19 10:33:38',1,'{\"balance\": 14700, \"lastName\": \"Abdelli\", \"firstName\": \"Nasredine\", \"phoneNumber\": \"0665907140\", \"licencePlate\": \"38810608\"}'),(7,'driver2','$2b$10$Bu79/bpAHshHC/QFHtLmouRu4JHM5qp.V0QzbZ.QCjbTtWMarOyaO','DRIVER','2021-05-21 01:09:52','2021-06-04 07:22:01',0,'{}'),(8,'Noni','$2b$10$wSrrAGypaPmSQh2qFgWIfOQMepaVg3TuFXi8mg83gfIV9gZzDZO3K','DRIVER','2021-05-22 08:02:51','2021-06-09 20:55:19',0,'{}'),(9,'Abdelhak','$2b$10$JibYedy.jQck2za3.OrSHuYzEeXgrVxWRUvYf6Hrfo0qXQ93fPNlS','DRIVER','2021-05-22 08:10:39','2021-05-22 08:10:39',0,NULL),(10,'ghazek','$2b$10$IRE3ZkKNaW2CdVTdcHJDdu3rBJW8UFqkoaXoMliiNSuVfaoiHMQGK','DRIVER ','2021-06-02 11:52:43','2021-06-10 08:36:46',0,'{\"balance\": 2400, \"lastName\": \"Ghazli\", \"firstName\": \"Abdelkader\", \"phoneNumber\": \"0663688381\", \"licencePlate\": \"38810608\"}'),(12,'admin','$2b$10$c6u00h4.PkTQuoWtXQgGfu9ANiEX/YRAf5Gtj2uJBsSU/zbIc1KJW','ADMIN','2021-06-02 13:24:48','2021-06-21 10:21:16',0,'{\"balance\": \"0\", \"lastName\": \"admin\", \"firstName\": \"admin\", \"phoneNumber\": \"0666666666\", \"licencePlate\": \"67721099882\"}'),(13,'youcef','$2b$10$x9o6UYVOOKmwFfwXg1.6OueBCB1lLcJ5x3KIxKPrIs3w6Yu.rM3/G','DRIVER ','2021-06-09 21:52:01','2021-06-09 22:16:46',0,'{\"balance\": 4900, \"lastName\": \"Rezki\", \"firstName\": \"Youcef\", \"phoneNumber\": \"0553710120\", \"licencePlate\": \"100208992\"}'),(14,'Nouri','$2b$10$Mcko41DjGBs1M1Bh93mWeul7hPmLvnKBs3YWagjyZvGQAlkqJuDcS','ADMIN','2021-06-21 10:23:18','2021-06-21 10:23:18',0,'{\"balance\": \"15600\", \"lastName\": \"Khoumani\", \"firstName\": \"Nouredine\", \"phoneNumber\": \"0666367662\", \"licencePlate\": \"10675408\"}');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle`
--

DROP TABLE IF EXISTS `vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `vehicle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `licencePlate` varchar(25) NOT NULL,
  `driver_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `driver_id` (`driver_id`),
  CONSTRAINT `vehicle_ibfk_1` FOREIGN KEY (`driver_id`) REFERENCES `driver` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle`
--

LOCK TABLES `vehicle` WRITE;
/*!40000 ALTER TABLE `vehicle` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehicle` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-26  0:06:20
