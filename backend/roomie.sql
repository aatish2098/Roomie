-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: roomie
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `amenities`
--

DROP TABLE IF EXISTS `amenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `amenities` (
  `aType` varchar(20) NOT NULL,
  `Description` varchar(100) NOT NULL,
  PRIMARY KEY (`aType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amenities`
--

LOCK TABLES `amenities` WRITE;
/*!40000 ALTER TABLE `amenities` DISABLE KEYS */;
INSERT INTO `amenities` VALUES ('CatCafe','a relaxing place filled with cats'),('CentralAC','an AC system for all rooms'),('CoffeeMachine','a machine for enjoy various kinds of coffee'),('DeliveryRoom','a place to keep your deliveries safe'),('DishWasher','dish washer that saves you time'),('Dryer','private dryer machine in your home'),('GameRoom','a place for you and your friends and family to have party!'),('Garden','a small outdoor garden for enjoying yourself'),('GasStove','gas stove for cooking'),('Gym','lots of modern fitness equipments here like running machines'),('InductionCooker','induction cooker for cooking'),('Parking','parking lots under the building'),('PublicWashingMachine','public washing machines for cloth washing'),('RoofTop','a place for a view of the whole city'),('Swimming Pool','perfect place for enjoying sunshine, relaxation and exercise'),('TechLounge','perfect place for learning and working'),('WashingMachine','private washing machine in your home'),('WasteShredder','a waste shredder in your kitchen');
/*!40000 ALTER TABLE `amenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `amenitiesin`
--

DROP TABLE IF EXISTS `amenitiesin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `amenitiesin` (
  `aType` varchar(20) NOT NULL,
  `UnitRentID` int NOT NULL,
  PRIMARY KEY (`aType`,`UnitRentID`),
  KEY `UnitRentID` (`UnitRentID`),
  CONSTRAINT `amenitiesin_ibfk_1` FOREIGN KEY (`aType`) REFERENCES `amenities` (`aType`),
  CONSTRAINT `amenitiesin_ibfk_2` FOREIGN KEY (`UnitRentID`) REFERENCES `apartmentunit` (`UnitRentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amenitiesin`
--

LOCK TABLES `amenitiesin` WRITE;
/*!40000 ALTER TABLE `amenitiesin` DISABLE KEYS */;
INSERT INTO `amenitiesin` VALUES ('CentralAC',1),('DishWasher',1),('Dryer',1),('GasStove',1),('InductionCooker',1),('WashingMachine',1),('WasteShredder',1),('CentralAC',2),('DishWasher',2),('Dryer',2),('GasStove',2),('CentralAC',3),('DishWasher',3),('Dryer',3),('InductionCooker',3),('CentralAC',4),('DishWasher',4),('InductionCooker',4),('WashingMachine',4),('CentralAC',5),('DishWasher',5),('Dryer',5),('InductionCooker',5),('WashingMachine',5),('WasteShredder',5),('CentralAC',6),('DishWasher',6),('Dryer',6),('GasStove',6),('InductionCooker',6),('WasteShredder',6),('CentralAC',7),('DishWasher',7),('Dryer',7),('GasStove',7),('InductionCooker',7),('WashingMachine',7),('WasteShredder',7),('CentralAC',8),('DishWasher',8),('Dryer',8),('GasStove',8),('InductionCooker',8),('WashingMachine',8),('WasteShredder',8),('CentralAC',9),('DishWasher',9),('GasStove',9),('WasteShredder',9),('CentralAC',10),('DishWasher',10),('Dryer',10),('InductionCooker',10),('WashingMachine',10),('CentralAC',11),('DishWasher',11),('InductionCooker',11),('WashingMachine',11),('CentralAC',12),('DishWasher',12),('GasStove',12),('InductionCooker',12),('WashingMachine',12),('CentralAC',13),('DishWasher',13),('WashingMachine',13),('CentralAC',14),('DishWasher',14),('CentralAC',15),('DishWasher',15),('Dryer',15),('InductionCooker',15),('WashingMachine',15),('WasteShredder',15),('CentralAC',16),('DishWasher',16),('GasStove',16),('InductionCooker',16),('WashingMachine',16),('CentralAC',17),('DishWasher',17),('CentralAC',18),('DishWasher',18),('CentralAC',19),('DishWasher',19),('CentralAC',20),('DishWasher',20),('Dryer',20),('GasStove',20),('InductionCooker',20),('WashingMachine',20),('WasteShredder',20),('CentralAC',21),('DishWasher',21),('WashingMachine',21),('CentralAC',22),('DishWasher',22),('Dryer',22),('GasStove',22),('InductionCooker',22),('WashingMachine',22),('WasteShredder',22),('CentralAC',23),('DishWasher',23),('Dryer',23),('GasStove',23),('WashingMachine',23),('CentralAC',24),('DishWasher',24),('CentralAC',25),('DishWasher',25),('Dryer',25),('GasStove',25),('InductionCooker',25),('WasteShredder',25),('CentralAC',26),('DishWasher',26),('Dryer',26),('GasStove',26),('CentralAC',27),('DishWasher',27),('Dryer',27),('CentralAC',28),('DishWasher',28),('Dryer',28),('GasStove',28),('InductionCooker',28),('WashingMachine',28),('WasteShredder',28),('CentralAC',29),('DishWasher',29),('WashingMachine',29),('CentralAC',30),('DishWasher',30),('Dryer',30),('GasStove',30),('InductionCooker',30),('WashingMachine',30),('CentralAC',31),('DishWasher',31),('Dryer',31),('InductionCooker',31),('WashingMachine',31),('CentralAC',32),('DishWasher',32),('GasStove',32),('WasteShredder',32),('CentralAC',33),('DishWasher',33),('CentralAC',34),('DishWasher',34),('Dryer',34),('InductionCooker',34),('WasteShredder',34),('CentralAC',35),('DishWasher',35),('GasStove',35),('WasteShredder',35),('CentralAC',36),('DishWasher',36),('InductionCooker',36),('CentralAC',37),('DishWasher',37),('InductionCooker',37),('CentralAC',38),('DishWasher',38),('InductionCooker',38),('WashingMachine',38),('WasteShredder',38),('CentralAC',39),('DishWasher',39),('Dryer',39),('InductionCooker',39),('WashingMachine',39),('WasteShredder',39),('CentralAC',40),('DishWasher',40),('Dryer',40),('GasStove',40),('InductionCooker',40),('WashingMachine',40),('WasteShredder',40),('CentralAC',41),('DishWasher',41),('InductionCooker',41),('CentralAC',42),('DishWasher',42),('Dryer',42),('WashingMachine',42),('WasteShredder',42),('CentralAC',43),('DishWasher',43),('Dryer',43),('WashingMachine',43),('WasteShredder',43),('CentralAC',44),('DishWasher',44),('Dryer',44),('GasStove',44),('InductionCooker',44),('WashingMachine',44),('WasteShredder',44),('CentralAC',45),('DishWasher',45),('GasStove',45),('InductionCooker',45),('WashingMachine',45),('WasteShredder',45),('CentralAC',46),('DishWasher',46),('WasteShredder',46),('CentralAC',47),('DishWasher',47),('Dryer',47),('GasStove',47),('InductionCooker',47),('WashingMachine',47),('WasteShredder',47),('CentralAC',48),('DishWasher',48),('InductionCooker',48),('WasteShredder',48),('CentralAC',49),('DishWasher',49),('Dryer',49),('GasStove',49),('InductionCooker',49),('WashingMachine',49),('WasteShredder',49),('CentralAC',50),('DishWasher',50),('GasStove',50),('InductionCooker',50),('WashingMachine',50),('CentralAC',51),('DishWasher',51),('Dryer',51),('GasStove',51),('InductionCooker',51),('WashingMachine',51),('WasteShredder',51),('CentralAC',52),('DishWasher',52),('CentralAC',53),('DishWasher',53),('Dryer',53),('GasStove',53),('InductionCooker',53),('WashingMachine',53),('WasteShredder',53),('CentralAC',54),('DishWasher',54),('CentralAC',55),('DishWasher',55),('Dryer',55),('GasStove',55),('InductionCooker',55),('WashingMachine',55),('CentralAC',56),('DishWasher',56),('CentralAC',57),('DishWasher',57),('Dryer',57),('InductionCooker',57),('CentralAC',58),('DishWasher',58),('InductionCooker',58),('WashingMachine',58),('CentralAC',59),('DishWasher',59),('Dryer',59),('GasStove',59),('InductionCooker',59),('WashingMachine',59),('WasteShredder',59),('CentralAC',60),('DishWasher',60),('CentralAC',61),('DishWasher',61),('InductionCooker',61),('WashingMachine',61),('WasteShredder',61),('CentralAC',62),('DishWasher',62),('Dryer',62),('GasStove',62),('InductionCooker',62),('WashingMachine',62),('WasteShredder',62),('CentralAC',63),('DishWasher',63),('WasteShredder',63),('CentralAC',64),('DishWasher',64),('CentralAC',65),('DishWasher',65),('Dryer',65),('GasStove',65),('WasteShredder',65),('CentralAC',66),('DishWasher',66),('Dryer',66),('GasStove',66),('InductionCooker',66),('WashingMachine',66),('CentralAC',67),('DishWasher',67),('Dryer',67),('WashingMachine',67),('CentralAC',68),('DishWasher',68),('Dryer',68),('InductionCooker',68),('WashingMachine',68),('WasteShredder',68),('CentralAC',69),('DishWasher',69),('Dryer',69),('GasStove',69),('CentralAC',70),('DishWasher',70),('CentralAC',71),('DishWasher',71),('Dryer',71),('CentralAC',72),('DishWasher',72),('Dryer',72),('CentralAC',73),('DishWasher',73),('Dryer',73),('GasStove',73),('WasteShredder',73),('CentralAC',74),('DishWasher',74),('GasStove',74),('CentralAC',75),('DishWasher',75),('WashingMachine',75),('WasteShredder',75),('CentralAC',76),('DishWasher',76),('GasStove',76),('InductionCooker',76),('CentralAC',77),('DishWasher',77),('Dryer',77),('GasStove',77),('WashingMachine',77),('WasteShredder',77),('CentralAC',78),('DishWasher',78),('Dryer',78),('GasStove',78),('InductionCooker',78),('WashingMachine',78),('WasteShredder',78),('CentralAC',79),('DishWasher',79),('Dryer',79),('InductionCooker',79),('CentralAC',80),('DishWasher',80),('CentralAC',81),('DishWasher',81),('GasStove',81),('CentralAC',82),('DishWasher',82),('InductionCooker',82),('WashingMachine',82),('CentralAC',83),('DishWasher',83),('CentralAC',84),('DishWasher',84),('Dryer',84),('GasStove',84),('InductionCooker',84),('WashingMachine',84),('WasteShredder',84),('CentralAC',85),('DishWasher',85),('Dryer',85),('WasteShredder',85),('CentralAC',86),('DishWasher',86),('Dryer',86),('GasStove',86),('InductionCooker',86),('WashingMachine',86),('WasteShredder',86),('CentralAC',87),('DishWasher',87),('WashingMachine',87),('WasteShredder',87),('CentralAC',88),('DishWasher',88),('GasStove',88),('InductionCooker',88),('WashingMachine',88),('WasteShredder',88),('CentralAC',89),('DishWasher',89),('InductionCooker',89),('WasteShredder',89),('CentralAC',90),('DishWasher',90),('Dryer',90),('GasStove',90),('WashingMachine',90),('CentralAC',91),('DishWasher',91),('GasStove',91),('InductionCooker',91),('WashingMachine',91),('CentralAC',92),('DishWasher',92),('Dryer',92),('InductionCooker',92),('WashingMachine',92),('WasteShredder',92),('CentralAC',93),('DishWasher',93),('Dryer',93),('WasteShredder',93),('CentralAC',94),('DishWasher',94),('Dryer',94),('GasStove',94),('InductionCooker',94),('WashingMachine',94),('WasteShredder',94);
/*!40000 ALTER TABLE `amenitiesin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apartmentbuilding`
--

DROP TABLE IF EXISTS `apartmentbuilding`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartmentbuilding` (
  `CompanyName` varchar(20) NOT NULL,
  `BuildingName` varchar(20) NOT NULL,
  `AddrNum` int NOT NULL,
  `AddrStreet` varchar(20) NOT NULL,
  `AddrCity` varchar(20) NOT NULL,
  `AddrState` varchar(5) NOT NULL,
  `AddrZipCode` varchar(5) NOT NULL,
  `YearBuilt` year NOT NULL,
  PRIMARY KEY (`CompanyName`,`BuildingName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartmentbuilding`
--

LOCK TABLES `apartmentbuilding` WRITE;
/*!40000 ALTER TABLE `apartmentbuilding` DISABLE KEYS */;
INSERT INTO `apartmentbuilding` VALUES ('Adams-Chen','Jennifer Bypass',81383,'Joshua Ranch','East Tylerport','PR','98011',2022),('Adams-Chen','Williams Mission',72348,'Cole Forest','South Jacob','MD','02567',2017),('Carter Group','Jeffrey Cliff',94293,'Joseph Lodge','Johnsmouth','FM','53984',2019),('Quinn-Vargas','Gregory Centers',255,'Joshua River','East Lisaside','PA','02302',2017),('Quinn-Vargas','Robert Terrace',20575,'Jesse Cove','East Tinastad','MP','47880',2018),('Quinn-Vargas','Shelton Pine',126,'Patrick Prairie','West Jennifer','MP','06916',2020),('Quinn-Vargas','Whitney Lake',4595,'Harmon Course','East Thomas','FL','25879',2021),('Ramos Inc','Mary Island',95357,'Amber Station','Kennethburgh','PA','14287',2016),('Snyder LLC','Benjamin Crescent',7191,'Amber Isle','North Stanleymouth','NE','30113',2021),('Wilson LLC','King Circles',17811,'Gibson Route','East James','AS','48644',2021);
/*!40000 ALTER TABLE `apartmentbuilding` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apartmentunit`
--

DROP TABLE IF EXISTS `apartmentunit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartmentunit` (
  `UnitRentID` int NOT NULL AUTO_INCREMENT,
  `CompanyName` varchar(20) NOT NULL,
  `BuildingName` varchar(20) NOT NULL,
  `unitNumber` varchar(10) NOT NULL,
  `MonthlyRent` int NOT NULL,
  `squareFootage` int NOT NULL,
  `AvailableDateForMoveIn` date NOT NULL,
  PRIMARY KEY (`UnitRentID`),
  KEY `CompanyName` (`CompanyName`,`BuildingName`),
  CONSTRAINT `apartmentunit_ibfk_1` FOREIGN KEY (`CompanyName`, `BuildingName`) REFERENCES `apartmentbuilding` (`CompanyName`, `BuildingName`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartmentunit`
--

LOCK TABLES `apartmentunit` WRITE;
/*!40000 ALTER TABLE `apartmentunit` DISABLE KEYS */;
INSERT INTO `apartmentunit` VALUES (1,'Ramos Inc','Mary Island','15D',2920,491,'2024-12-04'),(2,'Ramos Inc','Mary Island','15W',6444,796,'2024-07-17'),(3,'Ramos Inc','Mary Island','13R',3919,691,'2024-12-25'),(4,'Ramos Inc','Mary Island','3A',4980,746,'2024-11-05'),(5,'Ramos Inc','Mary Island','12B',5704,919,'2025-02-19'),(6,'Ramos Inc','Mary Island','19Z',5035,614,'2025-02-12'),(7,'Ramos Inc','Mary Island','5Y',3103,419,'2024-06-19'),(8,'Ramos Inc','Mary Island','6N',5768,671,'2024-10-02'),(9,'Ramos Inc','Mary Island','14H',5696,664,'2024-10-03'),(10,'Quinn-Vargas','Gregory Centers','9U',6754,1229,'2024-05-17'),(11,'Quinn-Vargas','Gregory Centers','14T',2761,371,'2024-10-06'),(12,'Quinn-Vargas','Gregory Centers','8M',6318,805,'2025-01-23'),(13,'Quinn-Vargas','Gregory Centers','14K',4756,531,'2024-11-26'),(14,'Quinn-Vargas','Gregory Centers','17R',2070,264,'2024-10-07'),(15,'Quinn-Vargas','Gregory Centers','17D',3855,486,'2024-07-15'),(16,'Quinn-Vargas','Gregory Centers','18R',5415,613,'2025-01-17'),(17,'Quinn-Vargas','Gregory Centers','15F',5370,973,'2024-08-20'),(18,'Quinn-Vargas','Gregory Centers','5R',4733,775,'2024-08-14'),(19,'Adams-Chen','Jennifer Bypass','17E',4035,465,'2024-08-11'),(20,'Adams-Chen','Jennifer Bypass','4Y',7828,1175,'2024-10-29'),(21,'Adams-Chen','Jennifer Bypass','2X',4749,782,'2025-03-16'),(22,'Adams-Chen','Jennifer Bypass','13B',5041,683,'2024-11-19'),(23,'Adams-Chen','Jennifer Bypass','12H',3574,484,'2024-10-20'),(24,'Adams-Chen','Jennifer Bypass','2N',7278,813,'2025-01-29'),(25,'Adams-Chen','Jennifer Bypass','12F',3494,598,'2024-04-25'),(26,'Snyder LLC','Benjamin Crescent','3J',5731,953,'2024-11-04'),(27,'Snyder LLC','Benjamin Crescent','5M',6967,787,'2024-12-24'),(28,'Snyder LLC','Benjamin Crescent','7C',2093,255,'2024-08-24'),(29,'Snyder LLC','Benjamin Crescent','2S',2773,515,'2024-05-17'),(30,'Snyder LLC','Benjamin Crescent','16X',3654,506,'2024-05-11'),(31,'Snyder LLC','Benjamin Crescent','6Q',2366,402,'2024-08-31'),(32,'Snyder LLC','Benjamin Crescent','6L',7696,995,'2024-08-03'),(33,'Snyder LLC','Benjamin Crescent','10V',2911,325,'2024-07-31'),(34,'Snyder LLC','Benjamin Crescent','6W',3302,405,'2025-04-10'),(35,'Snyder LLC','Benjamin Crescent','5T',3568,677,'2024-07-08'),(36,'Snyder LLC','Benjamin Crescent','5G',2098,246,'2025-03-20'),(37,'Snyder LLC','Benjamin Crescent','19P',4842,538,'2024-10-11'),(38,'Snyder LLC','Benjamin Crescent','8I',6094,919,'2024-07-03'),(39,'Snyder LLC','Benjamin Crescent','11R',4702,755,'2024-05-16'),(40,'Snyder LLC','Benjamin Crescent','9K',5851,1002,'2024-09-18'),(41,'Quinn-Vargas','Robert Terrace','7Q',5396,742,'2025-01-03'),(42,'Quinn-Vargas','Robert Terrace','11A',2380,390,'2024-11-23'),(43,'Quinn-Vargas','Robert Terrace','19P',7274,1447,'2024-08-24'),(44,'Quinn-Vargas','Robert Terrace','17S',6364,761,'2024-06-19'),(45,'Quinn-Vargas','Robert Terrace','8J',5166,841,'2025-02-06'),(46,'Quinn-Vargas','Robert Terrace','8X',3948,502,'2024-06-05'),(47,'Quinn-Vargas','Robert Terrace','13D',3829,578,'2025-01-18'),(48,'Quinn-Vargas','Robert Terrace','17U',7077,1214,'2024-05-01'),(49,'Quinn-Vargas','Robert Terrace','2V',4284,742,'2024-07-01'),(50,'Quinn-Vargas','Robert Terrace','10P',2653,334,'2024-08-18'),(51,'Quinn-Vargas','Robert Terrace','10V',5179,730,'2025-01-29'),(52,'Quinn-Vargas','Robert Terrace','16J',5215,648,'2024-12-11'),(53,'Quinn-Vargas','Robert Terrace','15H',3046,465,'2025-02-05'),(54,'Quinn-Vargas','Shelton Pine','18Q',6715,1024,'2025-02-02'),(55,'Quinn-Vargas','Shelton Pine','8F',6161,741,'2024-07-22'),(56,'Quinn-Vargas','Shelton Pine','17H',5523,767,'2024-12-25'),(57,'Quinn-Vargas','Shelton Pine','20T',6176,848,'2024-12-13'),(58,'Quinn-Vargas','Shelton Pine','11C',3239,360,'2024-12-02'),(59,'Quinn-Vargas','Shelton Pine','20N',2828,338,'2024-05-02'),(60,'Quinn-Vargas','Shelton Pine','14Y',2327,357,'2024-07-10'),(61,'Quinn-Vargas','Shelton Pine','3M',2003,224,'2024-12-04'),(62,'Quinn-Vargas','Shelton Pine','2T',3796,621,'2024-11-24'),(63,'Quinn-Vargas','Shelton Pine','15H',5296,631,'2025-01-05'),(64,'Quinn-Vargas','Whitney Lake','4K',7346,875,'2024-05-13'),(65,'Quinn-Vargas','Whitney Lake','10D',4748,848,'2024-09-18'),(66,'Quinn-Vargas','Whitney Lake','4V',6930,806,'2025-03-31'),(67,'Quinn-Vargas','Whitney Lake','7F',5222,674,'2025-03-10'),(68,'Quinn-Vargas','Whitney Lake','16Q',4216,549,'2025-02-28'),(69,'Adams-Chen','Williams Mission','9L',5135,753,'2024-11-18'),(70,'Adams-Chen','Williams Mission','18L',4696,557,'2024-11-11'),(71,'Adams-Chen','Williams Mission','5U',3763,468,'2024-06-26'),(72,'Adams-Chen','Williams Mission','8W',3178,397,'2024-05-02'),(73,'Adams-Chen','Williams Mission','9Q',7108,1075,'2024-08-09'),(74,'Adams-Chen','Williams Mission','2O',7312,1002,'2024-06-29'),(75,'Adams-Chen','Williams Mission','2V',4195,515,'2024-10-03'),(76,'Adams-Chen','Williams Mission','17C',5158,600,'2024-08-24'),(77,'Adams-Chen','Williams Mission','3Q',3834,513,'2024-07-22'),(78,'Carter Group','Jeffrey Cliff','13H',6436,781,'2024-11-10'),(79,'Carter Group','Jeffrey Cliff','10R',6149,1209,'2024-06-20'),(80,'Carter Group','Jeffrey Cliff','16O',7955,1138,'2024-08-20'),(81,'Carter Group','Jeffrey Cliff','18M',6729,928,'2024-11-03'),(82,'Carter Group','Jeffrey Cliff','14J',5658,700,'2024-12-12'),(83,'Carter Group','Jeffrey Cliff','20Q',4342,491,'2024-08-08'),(84,'Carter Group','Jeffrey Cliff','3X',2326,329,'2025-02-14'),(85,'Carter Group','Jeffrey Cliff','2H',3837,672,'2024-04-19'),(86,'Wilson LLC','King Circles','10G',2718,446,'2025-02-12'),(87,'Wilson LLC','King Circles','18U',3576,612,'2025-04-13'),(88,'Wilson LLC','King Circles','2O',2273,280,'2024-07-28'),(89,'Wilson LLC','King Circles','8T',2002,366,'2024-10-18'),(90,'Wilson LLC','King Circles','4B',5219,896,'2025-01-23'),(91,'Wilson LLC','King Circles','7M',3919,632,'2024-09-01'),(92,'Wilson LLC','King Circles','11Q',2201,265,'2024-07-10'),(93,'Wilson LLC','King Circles','9Q',3195,451,'2024-11-17'),(94,'Wilson LLC','King Circles','9H',5567,1026,'2025-03-16'),(95,'Snyder LLC','Benjamin Crescent','21X',4500,1000,'2024-09-16');
/*!40000 ALTER TABLE `apartmentunit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`) ON DELETE CASCADE,
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add apartment building',5,'add_apartmentbuilding'),(18,'Can change apartment building',5,'change_apartmentbuilding'),(19,'Can delete apartment building',5,'delete_apartmentbuilding'),(20,'Can view apartment building',5,'view_apartmentbuilding'),(21,'Can add apartment unit',6,'add_apartmentunit'),(22,'Can change apartment unit',6,'change_apartmentunit'),(23,'Can delete apartment unit',6,'delete_apartmentunit'),(24,'Can view apartment unit',6,'view_apartmentunit'),(25,'Can add content type',7,'add_contenttype'),(26,'Can change content type',7,'change_contenttype'),(27,'Can delete content type',7,'delete_contenttype'),(28,'Can view content type',7,'view_contenttype'),(29,'Can add session',8,'add_session'),(30,'Can change session',8,'change_session'),(31,'Can delete session',8,'delete_session'),(32,'Can view session',8,'view_session');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$600000$CHnovvlA4r31nA90o2i0qk$AnfyIRboZcWif6IGyCgJY1Lp4+ruZ7x1w+HAq4OQJJo=',NULL,0,'jwf295','Jeremy','Freeman','jwf295@nyu.edu',0,1,'2024-04-26 06:12:55.717345'),(2,'pbkdf2_sha256$600000$xyFsBUDtNHdWeo3nHoV1j1$cC3Y69Utjjfz3DwfAj7s5fG9+QCqwqC5Xygg8JRJ58A=',NULL,0,'fh818','Faiyaad','Hossain','fh818@nyu.edu',0,1,'2024-04-27 18:14:23.728715'),(3,'pbkdf2_sha256$600000$ZYsLDpcVA76z61DIQmhXNT$Rh86I0Whr8vijO1w5XSMZrA+8aRGWnzXRVewCh67Ch0=',NULL,0,'fyd','Faiyaad','Hossain','test@nyu.edu',0,1,'2024-04-27 21:19:42.386519'),(4,'pbkdf2_sha256$600000$znXXxNh9frQBcWIPmnoe7S$2HS//swkMt7AUd+laYtMGZF2VEjGqpwrZq/9miPlZC4=',NULL,0,'aatish','Aatish','Balaji','ab@nyu.edu',0,1,'2024-04-29 02:19:21.260786');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`) ON DELETE CASCADE,
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`) ON DELETE CASCADE,
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `username` varchar(20) NOT NULL,
  `UnitRentID` int NOT NULL,
  `comment` varchar(500) NOT NULL,
  PRIMARY KEY (`username`,`UnitRentID`,`comment`),
  KEY `UnitRentID` (`UnitRentID`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`UnitRentID`) REFERENCES `apartmentunit` (`UnitRentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES ('jwf295',21,'Nice Place'),('jwf295',22,'Amazing listing'),('jwf295',22,'Great place');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`) ON DELETE CASCADE,
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(7,'contenttypes','contenttype'),(5,'Roomie','apartmentbuilding'),(6,'Roomie','apartmentunit'),(8,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-03-30 23:35:43.406617'),(2,'auth','0001_initial','2024-03-30 23:35:44.521338'),(3,'admin','0001_initial','2024-03-30 23:35:44.817279'),(4,'admin','0002_logentry_remove_auto_add','2024-03-30 23:35:44.828402'),(5,'admin','0003_logentry_add_action_flag_choices','2024-03-30 23:35:44.847158'),(6,'contenttypes','0002_remove_content_type_name','2024-03-30 23:35:45.009929'),(7,'auth','0002_alter_permission_name_max_length','2024-03-30 23:35:45.125228'),(8,'auth','0003_alter_user_email_max_length','2024-03-30 23:35:45.175208'),(9,'auth','0004_alter_user_username_opts','2024-03-30 23:35:45.195223'),(10,'auth','0005_alter_user_last_login_null','2024-03-30 23:35:45.303378'),(11,'auth','0006_require_contenttypes_0002','2024-03-30 23:35:45.314435'),(12,'auth','0007_alter_validators_add_error_messages','2024-03-30 23:35:45.329208'),(13,'auth','0008_alter_user_username_max_length','2024-03-30 23:35:45.454621'),(14,'auth','0009_alter_user_last_name_max_length','2024-03-30 23:35:45.588422'),(15,'auth','0010_alter_group_name_max_length','2024-03-30 23:35:45.635197'),(16,'auth','0011_update_proxy_permissions','2024-03-30 23:35:45.652394'),(17,'auth','0012_alter_user_first_name_max_length','2024-03-30 23:35:45.812862'),(18,'sessions','0001_initial','2024-03-30 23:35:45.877583'),(19,'Roomie','0001_initial','2024-04-25 03:39:39.015819');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favourite`
--

DROP TABLE IF EXISTS `favourite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favourite` (
  `username` varchar(20) NOT NULL,
  `UnitRentID` int NOT NULL,
  PRIMARY KEY (`username`,`UnitRentID`),
  KEY `UnitRentID` (`UnitRentID`),
  CONSTRAINT `favourite_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`),
  CONSTRAINT `favourite_ibfk_2` FOREIGN KEY (`UnitRentID`) REFERENCES `apartmentunit` (`UnitRentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favourite`
--

LOCK TABLES `favourite` WRITE;
/*!40000 ALTER TABLE `favourite` DISABLE KEYS */;
INSERT INTO `favourite` VALUES ('fh818',2),('fh818',4),('jwf295',21);
/*!40000 ALTER TABLE `favourite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interests`
--

DROP TABLE IF EXISTS `interests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interests` (
  `username` varchar(20) NOT NULL,
  `UnitRentID` int NOT NULL,
  `RoommateCnt` tinyint NOT NULL,
  `MoveInDate` date NOT NULL,
  PRIMARY KEY (`username`,`UnitRentID`),
  KEY `UnitRentID` (`UnitRentID`),
  CONSTRAINT `interests_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`),
  CONSTRAINT `interests_ibfk_2` FOREIGN KEY (`UnitRentID`) REFERENCES `apartmentunit` (`UnitRentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interests`
--

LOCK TABLES `interests` WRITE;
/*!40000 ALTER TABLE `interests` DISABLE KEYS */;
INSERT INTO `interests` VALUES ('aj25082',25,0,'2024-05-28'),('ba64590',19,2,'2024-08-31'),('cm68244',13,0,'2025-02-05'),('cm68244',18,0,'2024-08-23'),('cm68244',89,0,'2024-11-25'),('cm68244',95,0,'2025-02-05'),('cm91354',53,2,'2025-03-07'),('cn95660',7,1,'2024-07-30'),('cn95660',23,2,'2025-01-06'),('cn95660',57,1,'2025-02-05'),('fh818',4,5,'2024-04-24'),('jh9679',18,2,'2024-10-01'),('jh9679',19,0,'2024-08-27'),('jh9679',57,0,'2024-12-31'),('jh9679',71,1,'2024-07-09'),('jh9679',91,2,'2024-10-25'),('jh9679',94,0,'2025-04-08'),('jh9679',95,2,'2025-02-05'),('jm19012',84,1,'2025-03-12'),('jm86443',12,0,'2025-03-16'),('jm86443',61,0,'2024-12-27'),('jwf295',7,1,'2025-04-30'),('jwf295',12,1,'2025-10-30'),('jwf295',13,1,'2025-10-30'),('lc2652',84,2,'2025-03-26'),('md22185',16,1,'2025-03-15'),('md22185',29,0,'2024-06-11'),('md22185',50,1,'2024-09-02'),('md22185',86,1,'2025-04-10'),('mw20220',88,2,'2024-08-18'),('rj70996',52,1,'2025-03-09');
/*!40000 ALTER TABLE `interests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `petpolicy`
--

DROP TABLE IF EXISTS `petpolicy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `petpolicy` (
  `CompanyName` varchar(20) NOT NULL,
  `BuildingName` varchar(20) NOT NULL,
  `PetType` varchar(50) NOT NULL,
  `PetSize` varchar(20) NOT NULL,
  `isAllowed` tinyint(1) NOT NULL,
  `RegistrationFee` int DEFAULT NULL,
  `MonthlyFee` int DEFAULT NULL,
  PRIMARY KEY (`CompanyName`,`BuildingName`,`PetType`,`PetSize`),
  CONSTRAINT `petpolicy_ibfk_1` FOREIGN KEY (`CompanyName`, `BuildingName`) REFERENCES `apartmentbuilding` (`CompanyName`, `BuildingName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `petpolicy`
--

LOCK TABLES `petpolicy` WRITE;
/*!40000 ALTER TABLE `petpolicy` DISABLE KEYS */;
INSERT INTO `petpolicy` VALUES ('Adams-Chen','Jennifer Bypass','Bird','Large',1,72,93),('Adams-Chen','Jennifer Bypass','Bird','Medium',0,7,147),('Adams-Chen','Jennifer Bypass','Bird','Small',0,91,104),('Adams-Chen','Jennifer Bypass','Cat','Large',0,93,57),('Adams-Chen','Jennifer Bypass','Cat','Medium',1,71,37),('Adams-Chen','Jennifer Bypass','Cat','Small',0,31,94),('Adams-Chen','Jennifer Bypass','Dog','Large',0,92,68),('Adams-Chen','Jennifer Bypass','Dog','Medium',1,20,10),('Adams-Chen','Jennifer Bypass','Dog','Small',0,60,55),('Adams-Chen','Jennifer Bypass','Rodent','Large',1,88,55),('Adams-Chen','Jennifer Bypass','Rodent','Medium',0,17,143),('Adams-Chen','Jennifer Bypass','Rodent','Small',0,21,87),('Adams-Chen','Jennifer Bypass','Turtle','Large',0,59,58),('Adams-Chen','Jennifer Bypass','Turtle','Medium',1,1,80),('Adams-Chen','Jennifer Bypass','Turtle','Small',1,89,10),('Adams-Chen','Williams Mission','Bird','Large',0,71,119),('Adams-Chen','Williams Mission','Bird','Medium',1,63,127),('Adams-Chen','Williams Mission','Bird','Small',0,51,69),('Adams-Chen','Williams Mission','Cat','Large',0,46,53),('Adams-Chen','Williams Mission','Cat','Medium',0,56,54),('Adams-Chen','Williams Mission','Cat','Small',0,93,50),('Adams-Chen','Williams Mission','Dog','Large',0,22,128),('Adams-Chen','Williams Mission','Dog','Medium',0,67,20),('Adams-Chen','Williams Mission','Dog','Small',1,17,94),('Adams-Chen','Williams Mission','Rodent','Large',1,58,124),('Adams-Chen','Williams Mission','Rodent','Medium',0,53,95),('Adams-Chen','Williams Mission','Rodent','Small',0,64,50),('Adams-Chen','Williams Mission','Turtle','Large',0,26,106),('Adams-Chen','Williams Mission','Turtle','Medium',1,86,47),('Adams-Chen','Williams Mission','Turtle','Small',0,46,91),('Carter Group','Jeffrey Cliff','Bird','Large',1,4,44),('Carter Group','Jeffrey Cliff','Bird','Medium',1,16,82),('Carter Group','Jeffrey Cliff','Bird','Small',1,59,28),('Carter Group','Jeffrey Cliff','Cat','Large',0,91,149),('Carter Group','Jeffrey Cliff','Cat','Medium',1,22,50),('Carter Group','Jeffrey Cliff','Cat','Small',1,47,59),('Carter Group','Jeffrey Cliff','Dog','Large',0,2,14),('Carter Group','Jeffrey Cliff','Dog','Medium',0,51,111),('Carter Group','Jeffrey Cliff','Dog','Small',0,4,48),('Carter Group','Jeffrey Cliff','Rodent','Large',0,10,142),('Carter Group','Jeffrey Cliff','Rodent','Medium',1,25,123),('Carter Group','Jeffrey Cliff','Rodent','Small',1,9,99),('Carter Group','Jeffrey Cliff','Turtle','Large',0,77,98),('Carter Group','Jeffrey Cliff','Turtle','Medium',1,46,92),('Carter Group','Jeffrey Cliff','Turtle','Small',0,16,22),('Quinn-Vargas','Gregory Centers','Bird','Large',1,1,146),('Quinn-Vargas','Gregory Centers','Bird','Medium',1,21,2),('Quinn-Vargas','Gregory Centers','Bird','Small',1,90,125),('Quinn-Vargas','Gregory Centers','Cat','Large',0,45,93),('Quinn-Vargas','Gregory Centers','Cat','Medium',0,18,4),('Quinn-Vargas','Gregory Centers','Cat','Small',1,98,47),('Quinn-Vargas','Gregory Centers','Dog','Large',0,21,71),('Quinn-Vargas','Gregory Centers','Dog','Medium',1,62,34),('Quinn-Vargas','Gregory Centers','Dog','Small',1,3,5),('Quinn-Vargas','Gregory Centers','Rodent','Large',1,73,64),('Quinn-Vargas','Gregory Centers','Rodent','Medium',0,91,133),('Quinn-Vargas','Gregory Centers','Rodent','Small',0,90,139),('Quinn-Vargas','Gregory Centers','Turtle','Large',1,90,99),('Quinn-Vargas','Gregory Centers','Turtle','Medium',1,97,61),('Quinn-Vargas','Gregory Centers','Turtle','Small',0,56,111),('Quinn-Vargas','Robert Terrace','Bird','Large',1,61,16),('Quinn-Vargas','Robert Terrace','Bird','Medium',0,82,74),('Quinn-Vargas','Robert Terrace','Bird','Small',0,2,58),('Quinn-Vargas','Robert Terrace','Cat','Large',1,3,76),('Quinn-Vargas','Robert Terrace','Cat','Medium',0,58,103),('Quinn-Vargas','Robert Terrace','Cat','Small',0,48,30),('Quinn-Vargas','Robert Terrace','Dog','Large',1,38,78),('Quinn-Vargas','Robert Terrace','Dog','Medium',0,30,92),('Quinn-Vargas','Robert Terrace','Dog','Small',0,59,37),('Quinn-Vargas','Robert Terrace','Rodent','Large',1,24,73),('Quinn-Vargas','Robert Terrace','Rodent','Medium',1,29,140),('Quinn-Vargas','Robert Terrace','Rodent','Small',0,66,81),('Quinn-Vargas','Robert Terrace','Turtle','Large',1,94,59),('Quinn-Vargas','Robert Terrace','Turtle','Medium',1,97,135),('Quinn-Vargas','Robert Terrace','Turtle','Small',0,33,79),('Quinn-Vargas','Shelton Pine','Bird','Large',1,9,60),('Quinn-Vargas','Shelton Pine','Bird','Medium',0,70,93),('Quinn-Vargas','Shelton Pine','Bird','Small',0,74,78),('Quinn-Vargas','Shelton Pine','Cat','Large',0,8,140),('Quinn-Vargas','Shelton Pine','Cat','Medium',1,58,18),('Quinn-Vargas','Shelton Pine','Cat','Small',1,64,73),('Quinn-Vargas','Shelton Pine','Dog','Large',1,66,141),('Quinn-Vargas','Shelton Pine','Dog','Medium',0,1,113),('Quinn-Vargas','Shelton Pine','Dog','Small',1,29,118),('Quinn-Vargas','Shelton Pine','Rodent','Large',0,12,74),('Quinn-Vargas','Shelton Pine','Rodent','Medium',1,60,27),('Quinn-Vargas','Shelton Pine','Rodent','Small',0,55,63),('Quinn-Vargas','Shelton Pine','Turtle','Large',0,85,140),('Quinn-Vargas','Shelton Pine','Turtle','Medium',1,68,77),('Quinn-Vargas','Shelton Pine','Turtle','Small',1,89,108),('Quinn-Vargas','Whitney Lake','Bird','Large',0,86,44),('Quinn-Vargas','Whitney Lake','Bird','Medium',1,20,125),('Quinn-Vargas','Whitney Lake','Bird','Small',0,13,115),('Quinn-Vargas','Whitney Lake','Cat','Large',0,96,1),('Quinn-Vargas','Whitney Lake','Cat','Medium',1,15,84),('Quinn-Vargas','Whitney Lake','Cat','Small',1,9,37),('Quinn-Vargas','Whitney Lake','Dog','Large',1,34,65),('Quinn-Vargas','Whitney Lake','Dog','Medium',0,91,35),('Quinn-Vargas','Whitney Lake','Dog','Small',0,0,132),('Quinn-Vargas','Whitney Lake','Rodent','Large',1,49,38),('Quinn-Vargas','Whitney Lake','Rodent','Medium',1,21,36),('Quinn-Vargas','Whitney Lake','Rodent','Small',0,55,143),('Quinn-Vargas','Whitney Lake','Turtle','Large',1,45,85),('Quinn-Vargas','Whitney Lake','Turtle','Medium',0,47,13),('Quinn-Vargas','Whitney Lake','Turtle','Small',1,80,149),('Ramos Inc','Mary Island','Bird','Large',1,36,144),('Ramos Inc','Mary Island','Bird','Medium',1,99,135),('Ramos Inc','Mary Island','Bird','Small',0,85,111),('Ramos Inc','Mary Island','Cat','Large',0,49,64),('Ramos Inc','Mary Island','Cat','Medium',1,51,63),('Ramos Inc','Mary Island','Cat','Small',1,44,150),('Ramos Inc','Mary Island','Dog','Large',0,37,136),('Ramos Inc','Mary Island','Dog','Medium',1,57,134),('Ramos Inc','Mary Island','Dog','Small',0,1,23),('Ramos Inc','Mary Island','Rodent','Large',1,38,94),('Ramos Inc','Mary Island','Rodent','Medium',1,30,128),('Ramos Inc','Mary Island','Rodent','Small',0,57,9),('Ramos Inc','Mary Island','Turtle','Large',1,9,82),('Ramos Inc','Mary Island','Turtle','Medium',1,91,96),('Ramos Inc','Mary Island','Turtle','Small',0,86,136),('Snyder LLC','Benjamin Crescent','Bird','Large',0,89,143),('Snyder LLC','Benjamin Crescent','Bird','Medium',0,1,138),('Snyder LLC','Benjamin Crescent','Bird','Small',1,18,4),('Snyder LLC','Benjamin Crescent','Cat','Large',1,48,61),('Snyder LLC','Benjamin Crescent','Cat','Medium',0,71,36),('Snyder LLC','Benjamin Crescent','Cat','Small',0,50,4),('Snyder LLC','Benjamin Crescent','Dog','Large',0,40,93),('Snyder LLC','Benjamin Crescent','Dog','Medium',1,18,30),('Snyder LLC','Benjamin Crescent','Dog','Small',1,12,80),('Snyder LLC','Benjamin Crescent','Rodent','Large',1,12,42),('Snyder LLC','Benjamin Crescent','Rodent','Medium',0,60,49),('Snyder LLC','Benjamin Crescent','Rodent','Small',1,28,92),('Snyder LLC','Benjamin Crescent','Turtle','Large',1,43,78),('Snyder LLC','Benjamin Crescent','Turtle','Medium',0,39,51),('Snyder LLC','Benjamin Crescent','Turtle','Small',1,41,129),('Wilson LLC','King Circles','Bird','Large',0,69,125),('Wilson LLC','King Circles','Bird','Medium',0,9,98),('Wilson LLC','King Circles','Bird','Small',1,98,13),('Wilson LLC','King Circles','Cat','Large',1,75,37),('Wilson LLC','King Circles','Cat','Medium',1,34,22),('Wilson LLC','King Circles','Cat','Small',1,84,111),('Wilson LLC','King Circles','Dog','Large',0,67,35),('Wilson LLC','King Circles','Dog','Medium',1,72,46),('Wilson LLC','King Circles','Dog','Small',0,17,16),('Wilson LLC','King Circles','Rodent','Large',1,100,41),('Wilson LLC','King Circles','Rodent','Medium',1,27,144),('Wilson LLC','King Circles','Rodent','Small',1,92,113),('Wilson LLC','King Circles','Turtle','Large',0,32,16),('Wilson LLC','King Circles','Turtle','Medium',0,43,16),('Wilson LLC','King Circles','Turtle','Small',0,92,52);
/*!40000 ALTER TABLE `petpolicy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pets`
--

DROP TABLE IF EXISTS `pets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pets` (
  `PetName` varchar(50) NOT NULL,
  `PetType` varchar(50) NOT NULL,
  `PetSize` varchar(20) NOT NULL,
  `username` varchar(20) NOT NULL,
  PRIMARY KEY (`PetName`,`PetType`,`username`),
  KEY `username` (`username`),
  CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pets`
--

LOCK TABLES `pets` WRITE;
/*!40000 ALTER TABLE `pets` DISABLE KEYS */;
INSERT INTO `pets` VALUES ('Crystal','Turtle','Small','sj3988'),('Dennis','Turtle','Large','rj70996'),('Eric','Dog','Medium','aj25082'),('Jennifer','Bird','Small','lh3388'),('Jeremy','Bird','Medium','jwf295'),('Joseph','Dog','Small','jm86443'),('Keith','Cat','Medium','pj37052'),('Leon','Cat','Small','sj3988'),('Mary','Bird','Large','cn95660'),('Mary','Rodent','Large','gc95084'),('Matthew','Turtle','Small','cm68244'),('Richard','Bird','Large','gc95084'),('Robert','Cat','Medium','ns37480'),('Robert','Rodent','Small','jm19012'),('Teresa','Bird','Large','jm86443'),('Test Pet 2','Cat','Large','fh818'),('Test Pet 3','Dog','Medium','fh818'),('Test Pet 4','Guinea Pig','Small','fh818'),('Vincent','Turtle','Large','mw20220');
/*!40000 ALTER TABLE `pets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provides`
--

DROP TABLE IF EXISTS `provides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provides` (
  `aType` varchar(20) NOT NULL,
  `CompanyName` varchar(20) NOT NULL,
  `BuildingName` varchar(20) NOT NULL,
  `Fee` int NOT NULL,
  `waitingList` int NOT NULL,
  PRIMARY KEY (`CompanyName`,`BuildingName`,`aType`),
  KEY `aType` (`aType`),
  CONSTRAINT `provides_ibfk_1` FOREIGN KEY (`aType`) REFERENCES `amenities` (`aType`),
  CONSTRAINT `provides_ibfk_2` FOREIGN KEY (`CompanyName`, `BuildingName`) REFERENCES `apartmentbuilding` (`CompanyName`, `BuildingName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provides`
--

LOCK TABLES `provides` WRITE;
/*!40000 ALTER TABLE `provides` DISABLE KEYS */;
INSERT INTO `provides` VALUES ('CoffeeMachine','Adams-Chen','Jennifer Bypass',0,9),('DeliveryRoom','Adams-Chen','Jennifer Bypass',14,2),('GameRoom','Adams-Chen','Jennifer Bypass',19,9),('Garden','Adams-Chen','Jennifer Bypass',17,4),('Gym','Adams-Chen','Jennifer Bypass',11,7),('Parking','Adams-Chen','Jennifer Bypass',23,1),('PublicWashingMachine','Adams-Chen','Jennifer Bypass',18,9),('RoofTop','Adams-Chen','Jennifer Bypass',26,7),('TechLounge','Adams-Chen','Jennifer Bypass',7,5),('CoffeeMachine','Adams-Chen','Williams Mission',31,9),('GameRoom','Adams-Chen','Williams Mission',18,9),('PublicWashingMachine','Adams-Chen','Williams Mission',6,4),('Swimming Pool','Adams-Chen','Williams Mission',22,4),('CoffeeMachine','Carter Group','Jeffrey Cliff',16,0),('DeliveryRoom','Carter Group','Jeffrey Cliff',24,8),('GameRoom','Carter Group','Jeffrey Cliff',18,3),('Garden','Carter Group','Jeffrey Cliff',3,2),('Gym','Carter Group','Jeffrey Cliff',11,1),('Parking','Carter Group','Jeffrey Cliff',6,3),('PublicWashingMachine','Carter Group','Jeffrey Cliff',30,0),('RoofTop','Carter Group','Jeffrey Cliff',6,0),('Swimming Pool','Carter Group','Jeffrey Cliff',23,2),('TechLounge','Carter Group','Jeffrey Cliff',10,1),('CoffeeMachine','Quinn-Vargas','Gregory Centers',32,0),('DeliveryRoom','Quinn-Vargas','Gregory Centers',31,1),('Garden','Quinn-Vargas','Gregory Centers',12,10),('Gym','Quinn-Vargas','Gregory Centers',12,0),('Parking','Quinn-Vargas','Gregory Centers',24,6),('PublicWashingMachine','Quinn-Vargas','Gregory Centers',32,5),('RoofTop','Quinn-Vargas','Gregory Centers',19,10),('Swimming Pool','Quinn-Vargas','Gregory Centers',13,7),('TechLounge','Quinn-Vargas','Gregory Centers',13,3),('GameRoom','Quinn-Vargas','Robert Terrace',27,8),('Garden','Quinn-Vargas','Robert Terrace',0,9),('Parking','Quinn-Vargas','Robert Terrace',17,1),('PublicWashingMachine','Quinn-Vargas','Robert Terrace',6,5),('Swimming Pool','Quinn-Vargas','Robert Terrace',17,2),('TechLounge','Quinn-Vargas','Robert Terrace',12,10),('DeliveryRoom','Quinn-Vargas','Shelton Pine',33,6),('Gym','Quinn-Vargas','Shelton Pine',9,4),('PublicWashingMachine','Quinn-Vargas','Shelton Pine',31,0),('Swimming Pool','Quinn-Vargas','Shelton Pine',7,2),('Gym','Quinn-Vargas','Whitney Lake',1,0),('TechLounge','Quinn-Vargas','Whitney Lake',23,6),('CoffeeMachine','Ramos Inc','Mary Island',20,2),('GameRoom','Ramos Inc','Mary Island',10,9),('Garden','Ramos Inc','Mary Island',16,4),('Parking','Ramos Inc','Mary Island',12,3),('RoofTop','Ramos Inc','Mary Island',10,1),('Swimming Pool','Ramos Inc','Mary Island',32,1),('TechLounge','Ramos Inc','Mary Island',11,1),('GameRoom','Snyder LLC','Benjamin Crescent',14,3),('CoffeeMachine','Wilson LLC','King Circles',20,3),('GameRoom','Wilson LLC','King Circles',12,3),('Garden','Wilson LLC','King Circles',34,9),('Gym','Wilson LLC','King Circles',12,0),('PublicWashingMachine','Wilson LLC','King Circles',2,10),('Swimming Pool','Wilson LLC','King Circles',6,4);
/*!40000 ALTER TABLE `provides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomie_pet`
--

DROP TABLE IF EXISTS `roomie_pet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roomie_pet` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `petName` varchar(50) NOT NULL,
  `petType` varchar(50) NOT NULL,
  `petSize` varchar(20) NOT NULL,
  `username_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Roomie_pet_username_id_825df4ef_fk_auth_user_id` (`username_id`),
  CONSTRAINT `Roomie_pet_username_id_825df4ef_fk_auth_user_id` FOREIGN KEY (`username_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomie_pet`
--

LOCK TABLES `roomie_pet` WRITE;
/*!40000 ALTER TABLE `roomie_pet` DISABLE KEYS */;
INSERT INTO `roomie_pet` VALUES (1,'pet1','bird','medium',11),(2,'pet1','bird','large',10),(3,'pet1','bird','large',10),(4,'pet2','bird','large',10),(5,'pet3','dog','large',10),(6,'pet4','cat','medium',10);
/*!40000 ALTER TABLE `roomie_pet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `name` varchar(20) NOT NULL,
  `squareFootage` int NOT NULL,
  `description` varchar(50) NOT NULL,
  `UnitRentID` int NOT NULL,
  PRIMARY KEY (`name`,`UnitRentID`),
  KEY `UnitRentID` (`UnitRentID`),
  CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`UnitRentID`) REFERENCES `apartmentunit` (`UnitRentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES ('bathroom0',51,'bathroom0',1),('bathroom0',55,'bathroom0',2),('bathroom0',57,'bathroom0',3),('bathroom0',54,'bathroom0',4),('bathroom0',85,'bathroom0',5),('bathroom0',96,'bathroom0',6),('bathroom0',75,'bathroom0',7),('bathroom0',74,'bathroom0',8),('bathroom0',54,'bathroom0',9),('bathroom0',74,'bathroom0',10),('bathroom0',54,'bathroom0',11),('bathroom0',88,'bathroom0',12),('bathroom0',85,'bathroom0',13),('bathroom0',51,'bathroom0',14),('bathroom0',96,'bathroom0',15),('bathroom0',84,'bathroom0',16),('bathroom0',75,'bathroom0',17),('bathroom0',86,'bathroom0',18),('bathroom0',90,'bathroom0',19),('bathroom0',91,'bathroom0',20),('bathroom0',58,'bathroom0',21),('bathroom0',82,'bathroom0',22),('bathroom0',74,'bathroom0',23),('bathroom0',87,'bathroom0',24),('bathroom0',59,'bathroom0',25),('bathroom0',65,'bathroom0',26),('bathroom0',86,'bathroom0',27),('bathroom0',51,'bathroom0',28),('bathroom0',81,'bathroom0',29),('bathroom0',66,'bathroom0',30),('bathroom0',84,'bathroom0',31),('bathroom0',68,'bathroom0',32),('bathroom0',69,'bathroom0',33),('bathroom0',85,'bathroom0',34),('bathroom0',93,'bathroom0',35),('bathroom0',77,'bathroom0',36),('bathroom0',82,'bathroom0',37),('bathroom0',71,'bathroom0',38),('bathroom0',61,'bathroom0',39),('bathroom0',78,'bathroom0',40),('bathroom0',74,'bathroom0',41),('bathroom0',73,'bathroom0',42),('bathroom0',93,'bathroom0',43),('bathroom0',59,'bathroom0',44),('bathroom0',52,'bathroom0',45),('bathroom0',67,'bathroom0',46),('bathroom0',78,'bathroom0',47),('bathroom0',79,'bathroom0',48),('bathroom0',65,'bathroom0',49),('bathroom0',72,'bathroom0',50),('bathroom0',90,'bathroom0',51),('bathroom0',93,'bathroom0',52),('bathroom0',73,'bathroom0',53),('bathroom0',75,'bathroom0',54),('bathroom0',74,'bathroom0',55),('bathroom0',81,'bathroom0',56),('bathroom0',83,'bathroom0',57),('bathroom0',71,'bathroom0',58),('bathroom0',70,'bathroom0',59),('bathroom0',65,'bathroom0',60),('bathroom0',96,'bathroom0',61),('bathroom0',72,'bathroom0',62),('bathroom0',65,'bathroom0',63),('bathroom0',91,'bathroom0',64),('bathroom0',96,'bathroom0',65),('bathroom0',97,'bathroom0',66),('bathroom0',90,'bathroom0',67),('bathroom0',66,'bathroom0',68),('bathroom0',66,'bathroom0',69),('bathroom0',71,'bathroom0',70),('bathroom0',57,'bathroom0',71),('bathroom0',57,'bathroom0',72),('bathroom0',61,'bathroom0',73),('bathroom0',87,'bathroom0',74),('bathroom0',84,'bathroom0',75),('bathroom0',50,'bathroom0',76),('bathroom0',67,'bathroom0',77),('bathroom0',69,'bathroom0',78),('bathroom0',96,'bathroom0',79),('bathroom0',50,'bathroom0',80),('bathroom0',73,'bathroom0',81),('bathroom0',91,'bathroom0',82),('bathroom0',92,'bathroom0',83),('bathroom0',53,'bathroom0',84),('bathroom0',95,'bathroom0',85),('bathroom0',61,'bathroom0',86),('bathroom0',94,'bathroom0',87),('bathroom0',65,'bathroom0',88),('bathroom0',71,'bathroom0',89),('bathroom0',54,'bathroom0',90),('bathroom0',54,'bathroom0',91),('bathroom0',71,'bathroom0',92),('bathroom0',90,'bathroom0',93),('bathroom0',54,'bathroom0',94),('bathroom1',67,'bathroom1',4),('bathroom1',71,'bathroom1',5),('bathroom1',59,'bathroom1',7),('bathroom1',97,'bathroom1',8),('bathroom1',97,'bathroom1',10),('bathroom1',65,'bathroom1',12),('bathroom1',95,'bathroom1',13),('bathroom1',86,'bathroom1',15),('bathroom1',96,'bathroom1',16),('bathroom1',62,'bathroom1',17),('bathroom1',59,'bathroom1',18),('bathroom1',75,'bathroom1',20),('bathroom1',60,'bathroom1',23),('bathroom1',78,'bathroom1',24),('bathroom1',51,'bathroom1',26),('bathroom1',71,'bathroom1',32),('bathroom1',54,'bathroom1',34),('bathroom1',94,'bathroom1',35),('bathroom1',67,'bathroom1',37),('bathroom1',53,'bathroom1',38),('bathroom1',72,'bathroom1',39),('bathroom1',96,'bathroom1',40),('bathroom1',68,'bathroom1',41),('bathroom1',55,'bathroom1',43),('bathroom1',75,'bathroom1',44),('bathroom1',60,'bathroom1',45),('bathroom1',62,'bathroom1',46),('bathroom1',59,'bathroom1',48),('bathroom1',84,'bathroom1',52),('bathroom1',53,'bathroom1',54),('bathroom1',50,'bathroom1',55),('bathroom1',84,'bathroom1',56),('bathroom1',85,'bathroom1',57),('bathroom1',54,'bathroom1',63),('bathroom1',90,'bathroom1',64),('bathroom1',77,'bathroom1',65),('bathroom1',82,'bathroom1',66),('bathroom1',52,'bathroom1',67),('bathroom1',87,'bathroom1',68),('bathroom1',94,'bathroom1',69),('bathroom1',75,'bathroom1',73),('bathroom1',73,'bathroom1',75),('bathroom1',94,'bathroom1',76),('bathroom1',83,'bathroom1',79),('bathroom1',52,'bathroom1',80),('bathroom1',92,'bathroom1',81),('bathroom1',100,'bathroom1',83),('bathroom1',52,'bathroom1',85),('bathroom1',85,'bathroom1',87),('bathroom1',63,'bathroom1',90),('bathroom1',59,'bathroom1',91),('bathroom1',67,'bathroom1',93),('bathroom1',76,'bathroom1',94),('bathroom2',76,'bathroom2',10),('bathroom2',72,'bathroom2',12),('bathroom2',97,'bathroom2',17),('bathroom2',97,'bathroom2',23),('bathroom2',84,'bathroom2',26),('bathroom2',94,'bathroom2',32),('bathroom2',64,'bathroom2',37),('bathroom2',67,'bathroom2',38),('bathroom2',83,'bathroom2',40),('bathroom2',56,'bathroom2',43),('bathroom2',73,'bathroom2',44),('bathroom2',54,'bathroom2',48),('bathroom2',93,'bathroom2',56),('bathroom2',87,'bathroom2',64),('bathroom2',60,'bathroom2',66),('bathroom2',85,'bathroom2',79),('bathroom2',79,'bathroom2',80),('bathroom2',69,'bathroom2',81),('bathroom2',97,'bathroom2',85),('bathroom2',50,'bathroom2',90),('bathroom2',51,'bathroom2',91),('bathroom2',78,'bathroom2',94),('bathroom3',58,'bathroom3',10),('bathroom3',100,'bathroom3',12),('bathroom3',71,'bathroom3',17),('bathroom3',79,'bathroom3',32),('bathroom3',91,'bathroom3',38),('bathroom3',70,'bathroom3',43),('bathroom3',50,'bathroom3',48),('bathroom3',59,'bathroom3',64),('bathroom3',88,'bathroom3',66),('bathroom3',50,'bathroom3',79),('bathroom3',61,'bathroom3',90),('bathroom3',55,'bathroom3',94),('bathroom4',51,'bathroom4',10),('bathroom4',70,'bathroom4',12),('bathroom4',59,'bathroom4',32),('bathroom4',77,'bathroom4',38),('bathroom4',92,'bathroom4',43),('bathroom4',82,'bathroom4',48),('bathroom4',52,'bathroom4',66),('bathroom4',57,'bathroom4',79),('bathroom4',63,'bathroom4',94),('bathroom5',70,'bathroom5',32),('bathroom5',77,'bathroom5',43),('bathroom5',92,'bathroom5',48),('bathroom5',84,'bathroom5',79),('bathroom5',82,'bathroom5',94),('bathroom6',60,'bathroom6',32),('bathroom6',82,'bathroom6',43),('bathroom6',55,'bathroom6',48),('bedroom0',177,'bedroom0',1),('bedroom0',197,'bedroom0',2),('bedroom0',100,'bedroom0',3),('bedroom0',199,'bedroom0',4),('bedroom0',154,'bedroom0',5),('bedroom0',197,'bedroom0',6),('bedroom0',133,'bedroom0',7),('bedroom0',132,'bedroom0',8),('bedroom0',142,'bedroom0',9),('bedroom0',116,'bedroom0',10),('bedroom0',120,'bedroom0',11),('bedroom0',116,'bedroom0',12),('bedroom0',199,'bedroom0',13),('bedroom0',191,'bedroom0',14),('bedroom0',174,'bedroom0',15),('bedroom0',148,'bedroom0',16),('bedroom0',157,'bedroom0',17),('bedroom0',107,'bedroom0',18),('bedroom0',179,'bedroom0',19),('bedroom0',155,'bedroom0',20),('bedroom0',137,'bedroom0',21),('bedroom0',123,'bedroom0',22),('bedroom0',121,'bedroom0',23),('bedroom0',146,'bedroom0',24),('bedroom0',196,'bedroom0',25),('bedroom0',173,'bedroom0',26),('bedroom0',178,'bedroom0',27),('bedroom0',126,'bedroom0',28),('bedroom0',172,'bedroom0',29),('bedroom0',116,'bedroom0',30),('bedroom0',180,'bedroom0',31),('bedroom0',114,'bedroom0',32),('bedroom0',160,'bedroom0',33),('bedroom0',103,'bedroom0',34),('bedroom0',107,'bedroom0',35),('bedroom0',191,'bedroom0',36),('bedroom0',140,'bedroom0',37),('bedroom0',152,'bedroom0',38),('bedroom0',154,'bedroom0',39),('bedroom0',129,'bedroom0',40),('bedroom0',129,'bedroom0',41),('bedroom0',103,'bedroom0',42),('bedroom0',166,'bedroom0',43),('bedroom0',146,'bedroom0',44),('bedroom0',127,'bedroom0',45),('bedroom0',195,'bedroom0',46),('bedroom0',135,'bedroom0',47),('bedroom0',104,'bedroom0',48),('bedroom0',111,'bedroom0',49),('bedroom0',123,'bedroom0',50),('bedroom0',182,'bedroom0',51),('bedroom0',151,'bedroom0',52),('bedroom0',136,'bedroom0',53),('bedroom0',162,'bedroom0',54),('bedroom0',161,'bedroom0',55),('bedroom0',183,'bedroom0',56),('bedroom0',125,'bedroom0',57),('bedroom0',112,'bedroom0',58),('bedroom0',153,'bedroom0',59),('bedroom0',194,'bedroom0',60),('bedroom0',187,'bedroom0',61),('bedroom0',125,'bedroom0',62),('bedroom0',168,'bedroom0',63),('bedroom0',172,'bedroom0',64),('bedroom0',154,'bedroom0',65),('bedroom0',161,'bedroom0',66),('bedroom0',178,'bedroom0',67),('bedroom0',112,'bedroom0',68),('bedroom0',112,'bedroom0',69),('bedroom0',182,'bedroom0',70),('bedroom0',160,'bedroom0',71),('bedroom0',200,'bedroom0',72),('bedroom0',138,'bedroom0',73),('bedroom0',151,'bedroom0',74),('bedroom0',153,'bedroom0',75),('bedroom0',161,'bedroom0',76),('bedroom0',162,'bedroom0',77),('bedroom0',146,'bedroom0',78),('bedroom0',114,'bedroom0',79),('bedroom0',101,'bedroom0',80),('bedroom0',188,'bedroom0',81),('bedroom0',143,'bedroom0',82),('bedroom0',188,'bedroom0',83),('bedroom0',137,'bedroom0',84),('bedroom0',185,'bedroom0',85),('bedroom0',197,'bedroom0',86),('bedroom0',139,'bedroom0',87),('bedroom0',182,'bedroom0',88),('bedroom0',184,'bedroom0',89),('bedroom0',105,'bedroom0',90),('bedroom0',142,'bedroom0',91),('bedroom0',153,'bedroom0',92),('bedroom0',131,'bedroom0',93),('bedroom0',164,'bedroom0',94),('bedroom1',106,'bedroom1',1),('bedroom1',118,'bedroom1',2),('bedroom1',121,'bedroom1',3),('bedroom1',149,'bedroom1',4),('bedroom1',156,'bedroom1',5),('bedroom1',133,'bedroom1',6),('bedroom1',149,'bedroom1',8),('bedroom1',111,'bedroom1',9),('bedroom1',153,'bedroom1',10),('bedroom1',113,'bedroom1',12),('bedroom1',119,'bedroom1',17),('bedroom1',156,'bedroom1',18),('bedroom1',108,'bedroom1',20),('bedroom1',142,'bedroom1',21),('bedroom1',132,'bedroom1',22),('bedroom1',140,'bedroom1',24),('bedroom1',185,'bedroom1',25),('bedroom1',102,'bedroom1',26),('bedroom1',161,'bedroom1',27),('bedroom1',136,'bedroom1',29),('bedroom1',187,'bedroom1',30),('bedroom1',165,'bedroom1',32),('bedroom1',124,'bedroom1',35),('bedroom1',146,'bedroom1',39),('bedroom1',172,'bedroom1',40),('bedroom1',129,'bedroom1',41),('bedroom1',145,'bedroom1',42),('bedroom1',153,'bedroom1',43),('bedroom1',101,'bedroom1',44),('bedroom1',178,'bedroom1',45),('bedroom1',143,'bedroom1',47),('bedroom1',169,'bedroom1',48),('bedroom1',115,'bedroom1',49),('bedroom1',144,'bedroom1',51),('bedroom1',170,'bedroom1',52),('bedroom1',121,'bedroom1',53),('bedroom1',116,'bedroom1',54),('bedroom1',182,'bedroom1',55),('bedroom1',171,'bedroom1',56),('bedroom1',108,'bedroom1',62),('bedroom1',133,'bedroom1',64),('bedroom1',166,'bedroom1',65),('bedroom1',115,'bedroom1',66),('bedroom1',183,'bedroom1',67),('bedroom1',157,'bedroom1',68),('bedroom1',137,'bedroom1',69),('bedroom1',187,'bedroom1',70),('bedroom1',197,'bedroom1',71),('bedroom1',176,'bedroom1',73),('bedroom1',150,'bedroom1',74),('bedroom1',181,'bedroom1',75),('bedroom1',112,'bedroom1',76),('bedroom1',122,'bedroom1',77),('bedroom1',168,'bedroom1',78),('bedroom1',143,'bedroom1',79),('bedroom1',109,'bedroom1',80),('bedroom1',188,'bedroom1',81),('bedroom1',170,'bedroom1',82),('bedroom1',111,'bedroom1',85),('bedroom1',114,'bedroom1',87),('bedroom1',159,'bedroom1',90),('bedroom1',131,'bedroom1',91),('bedroom1',162,'bedroom1',94),('bedroom2',168,'bedroom2',4),('bedroom2',111,'bedroom2',8),('bedroom2',191,'bedroom2',10),('bedroom2',141,'bedroom2',17),('bedroom2',142,'bedroom2',20),('bedroom2',149,'bedroom2',21),('bedroom2',134,'bedroom2',22),('bedroom2',161,'bedroom2',24),('bedroom2',140,'bedroom2',26),('bedroom2',158,'bedroom2',41),('bedroom2',198,'bedroom2',43),('bedroom2',102,'bedroom2',44),('bedroom2',155,'bedroom2',45),('bedroom2',125,'bedroom2',47),('bedroom2',144,'bedroom2',48),('bedroom2',170,'bedroom2',49),('bedroom2',153,'bedroom2',51),('bedroom2',116,'bedroom2',54),('bedroom2',129,'bedroom2',64),('bedroom2',145,'bedroom2',65),('bedroom2',185,'bedroom2',69),('bedroom2',193,'bedroom2',74),('bedroom2',151,'bedroom2',78),('bedroom2',134,'bedroom2',79),('bedroom2',195,'bedroom2',80),('bedroom2',122,'bedroom2',81),('bedroom2',117,'bedroom2',90),('bedroom2',177,'bedroom2',94),('bedroom3',183,'bedroom3',10),('bedroom3',155,'bedroom3',20),('bedroom3',144,'bedroom3',22),('bedroom3',184,'bedroom3',26),('bedroom3',144,'bedroom3',49),('bedroom3',174,'bedroom3',54),('bedroom3',125,'bedroom3',74),('bedroom3',175,'bedroom3',78),('bedroom3',150,'bedroom3',79),('bedroom3',194,'bedroom3',80),('bedroom3',124,'bedroom3',90),('bedroom4',191,'bedroom4',10),('bedroom4',192,'bedroom4',20),('bedroom4',198,'bedroom4',79),('livingroom',1000,'this is a special livingroom',95),('livingroom0',122,'livingroom0',2),('livingroom0',171,'livingroom0',3),('livingroom0',179,'livingroom0',5),('livingroom0',105,'livingroom0',9),('livingroom0',182,'livingroom0',16),('livingroom0',113,'livingroom0',17),('livingroom0',113,'livingroom0',18),('livingroom0',159,'livingroom0',20),('livingroom0',179,'livingroom0',21),('livingroom0',119,'livingroom0',24),('livingroom0',100,'livingroom0',27),('livingroom0',174,'livingroom0',32),('livingroom0',149,'livingroom0',35),('livingroom0',152,'livingroom0',38),('livingroom0',173,'livingroom0',39),('livingroom0',162,'livingroom0',40),('livingroom0',188,'livingroom0',43),('livingroom0',102,'livingroom0',44),('livingroom0',126,'livingroom0',45),('livingroom0',151,'livingroom0',48),('livingroom0',189,'livingroom0',54),('livingroom0',162,'livingroom0',55),('livingroom0',112,'livingroom0',57),('livingroom0',191,'livingroom0',62),('livingroom0',190,'livingroom0',63),('livingroom0',127,'livingroom0',65),('livingroom0',185,'livingroom0',73),('livingroom0',183,'livingroom0',74),('livingroom0',166,'livingroom0',80),('livingroom0',191,'livingroom0',82),('livingroom1',197,'livingroom1',2),('livingroom1',146,'livingroom1',3),('livingroom1',138,'livingroom1',5),('livingroom1',150,'livingroom1',9),('livingroom1',103,'livingroom1',18),('livingroom1',151,'livingroom1',27),('livingroom1',113,'livingroom1',38),('livingroom1',125,'livingroom1',40),('livingroom1',163,'livingroom1',43),('livingroom1',122,'livingroom1',57),('livingroom1',111,'livingroom1',73),('livingroom1',116,'livingroom1',80),('livingroom2',122,'livingroom2',57),('livingroom2',130,'livingroom2',73);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(20) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `DOB` date NOT NULL,
  `gender` tinyint NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `passwd` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('aatish','Aatish','Balaji','2024-04-01',1,'ab@nyu.edu','5515515511','pbkdf2_sha256$600000$nuIABgMmRIgXgeo2LOVF03$UsONF40SErokE/AUWmaBpCDNv2Fg3Csc/L/JvX+BnuU='),('aj25082','Amy','Jimenez','1968-12-12',1,'aj25082@nyu.edu','7412215748','5sz8IAp2'),('ba64590','Bridget','Anderson','1981-02-17',2,'ba64590@nyu.edu','4103682435','6NB2gP9p'),('bw7804','Bryce','Williams','1954-06-05',2,'bw7804@nyu.edu','3998651975','HK4mLGxZ'),('cm68244','Corey','Massey','1982-10-10',2,'cm68244@nyu.edu','8574248170','7v4pPBEw'),('cm91354','Clayton','Moreno','1951-03-18',2,'cm91354@nyu.edu','7965573773','92LAvRpY'),('cn95660','Cynthia','Nguyen','1950-08-16',1,'cn95660@nyu.edu','9766312915','9YmOLARa'),('dw00259','Dennis','Weber','1950-09-13',1,'dw00259@nyu.edu','4216453611','m3HAuiMc'),('fh818','Faiyaad','Hossain','1998-04-14',1,'fh818@nyu.edu','3477918897','pbkdf2_sha256$600000$BGFF4Keh3FCVYUUeLC3IHv$Qu1PrNVWS4bm0ufw85aqkPtBtc1XiAGl9BTCO+ogbmY='),('fyd','Faiyaad','Hossain','1998-04-14',1,'test@nyu.edu','3477918897','pbkdf2_sha256$600000$6gCzx7zgyRwXLeFtWFHdat$Ct6vcQg4opuFEP+07Xc2l33D1a3srqwBPQr9LBpREDs='),('gc95084','Grace','Carroll','2003-04-11',1,'gc95084@nyu.edu','7576336071','ra7MiA9b'),('hj2345','Viktor','Jiang','2000-01-18',2,'hj2345@nyu.edu','3472613809','thi3h*8h23hK'),('jh9679','Jessica','Hayes','1988-08-17',1,'jh9679@nyu.edu','5903839072','vT9sNXoH'),('jm19012','John','Mckee','1994-05-22',1,'jm19012@nyu.edu','9537388605','4dIyDDcd'),('jm86443','James','Mathews','1965-08-15',2,'jm86443@nyu.edu','7008284903','7BzU34fN'),('jwf295','Jeremy','Freeman','1996-01-15',1,'jwf295@nyu.edu','9737389159','pbkdf2_sha256$720000$3FGBNvfb6EYQUb1FDAvC7s$dhOEkebGXc2g8Dpvl1DJJiASj0BY1RWTr689GO3SvqU='),('lc2652','Linda','Crawford','1960-08-20',1,'lc2652@nyu.edu','6385947124','z0bDkkgz'),('lh3388','Loretta','Harris','1954-11-20',1,'lh3388@nyu.edu','8227142005','V4ktPBRt'),('md22185','Micheal','Duffy','1971-04-17',2,'md22185@nyu.edu','5439157750','VvkS6CTx'),('mw20220','Maria','Williamson','1960-09-01',2,'mw20220@nyu.edu','9682148006','36LDpySZ'),('ns37480','Nathan','Sutton','1999-12-18',2,'ns37480@nyu.edu','8908655198','q7Dr7sTm'),('pj37052','Paul','Jones','1995-03-17',2,'pj37052@nyu.edu','3369893676','1g2cA3kE'),('rj70996','Rebecca','Johnson','2001-01-13',1,'rj70996@nyu.edu','4002388932','5NnoLXep'),('sj3988','Sarah','Jenkins','1969-04-13',1,'sj3988@nyu.edu','2769857857','7nzJLH5e'),('wm5558','Walter','Mcintosh','1992-05-01',2,'wm5558@nyu.edu','6385824228','rMS9xBfl');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-29  3:14:19
