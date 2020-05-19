-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 19, 2020 at 07:25 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projects_tracer`
--

-- --------------------------------------------------------

--
-- Table structure for table `divisions_tbl`
--

DROP TABLE IF EXISTS `divisions_tbl`;
CREATE TABLE IF NOT EXISTS `divisions_tbl` (
  `division_id` int(11) NOT NULL AUTO_INCREMENT,
  `location_id` int(5) NOT NULL,
  `division_name` varchar(50) NOT NULL,
  PRIMARY KEY (`division_id`)
) ENGINE=MyISAM AUTO_INCREMENT=99 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `divisions_tbl`
--

INSERT INTO `divisions_tbl` (`division_id`, `location_id`, `division_name`) VALUES
(1, 1, 'Ngoundere'),
(2, 1, 'Tibati'),
(3, 1, 'Ngoundal'),
(4, 1, 'Meinganga'),
(5, 1, 'Banyo'),
(6, 3, 'Yaounde'),
(7, 3, 'Akonolinga'),
(8, 3, 'Bafia'),
(9, 3, 'Mbalmayo'),
(10, 3, 'Mbandjock'),
(11, 3, 'Nanga-Eboko'),
(12, 3, 'Obala'),
(13, 3, 'Soa'),
(14, 3, 'Sa’a'),
(15, 4, 'Bertoua'),
(16, 4, 'Yokadouma'),
(17, 4, 'Garoua-Boulai'),
(18, 4, 'Belabo'),
(19, 4, 'Batouri'),
(20, 4, 'Abong-Mbang'),
(21, 5, 'Maroua'),
(22, 5, 'Yagoua'),
(23, 5, 'Mora'),
(24, 5, 'Mokolo'),
(25, 5, 'Maga'),
(26, 5, 'Kousseri'),
(27, 5, 'Guidigis'),
(28, 5, 'Bogo'),
(29, 5, 'Blangoua'),
(30, 5, 'Gazawa'),
(31, 6, 'Douala'),
(32, 6, 'Edea'),
(33, 6, 'Loum'),
(34, 6, 'Manjo'),
(35, 6, 'Mbanga'),
(36, 6, 'Melong'),
(37, 6, 'Njombe'),
(38, 6, 'Nkongsamba'),
(39, 6, 'Penja'),
(40, 6, 'Souza'),
(41, 7, 'Garoua'),
(42, 7, 'Touboro'),
(43, 7, 'Cheboa'),
(44, 7, 'Pitoa'),
(45, 7, 'Lagdo'),
(46, 7, 'Guide'),
(47, 7, 'Figuil'),
(48, 8, 'Bamenda'),
(49, 8, 'Bafut'),
(50, 8, 'Bali'),
(51, 8, 'Kumbo'),
(52, 8, 'Ndop'),
(53, 8, 'Akum'),
(54, 8, 'Santa'),
(55, 8, 'Nkambe'),
(56, 8, 'Oku'),
(57, 8, 'Wum'),
(58, 8, 'Bambili'),
(59, 8, 'Batibo'),
(60, 8, 'Mendakwe'),
(61, 8, 'Mbengwi'),
(62, 8, 'Baba'),
(63, 8, 'Babungo'),
(64, 8, 'Bafanji'),
(65, 8, 'Bafochu'),
(66, 8, 'Fundong'),
(67, 2, 'Bafoussam'),
(68, 2, 'Bafang'),
(69, 2, 'Bandjoun'),
(70, 2, 'Bangante'),
(71, 2, 'Dschang'),
(72, 2, 'Foumban'),
(73, 2, 'Foumbot'),
(74, 2, 'Kekem'),
(75, 2, 'Magba'),
(76, 2, 'Mbouda'),
(77, 9, 'Ebolowa'),
(78, 9, 'Sangmelima'),
(79, 9, 'Kribi'),
(80, 9, 'Ambam'),
(81, 9, 'Kye-Ossi'),
(82, 9, 'Lolodorf'),
(83, 9, 'Campo'),
(84, 9, 'Zoatele'),
(85, 9, 'Mintom'),
(86, 10, 'Buea'),
(87, 10, 'Munya'),
(88, 10, 'Kumba'),
(89, 10, 'Mutengene'),
(90, 10, 'Tiko'),
(91, 10, 'Limbe'),
(92, 10, 'Idenau'),
(93, 10, 'Tole'),
(94, 10, 'Mamfe'),
(95, 10, 'Muyuka'),
(96, 10, 'Tombel'),
(97, 10, 'Bangem'),
(98, 10, 'Eyumojok');

-- --------------------------------------------------------

--
-- Table structure for table `location_tbl`
--

DROP TABLE IF EXISTS `location_tbl`;
CREATE TABLE IF NOT EXISTS `location_tbl` (
  `location_id` int(11) NOT NULL AUTO_INCREMENT,
  `location_name` varchar(50) NOT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `location_tbl`
--

INSERT INTO `location_tbl` (`location_id`, `location_name`) VALUES
(1, 'Adamawa'),
(2, 'West'),
(3, 'Center'),
(4, 'East'),
(5, 'Far North'),
(6, 'Littoral'),
(7, 'North'),
(8, 'North West'),
(9, 'South'),
(10, 'South West');

-- --------------------------------------------------------

--
-- Table structure for table `reports_tbl`
--

DROP TABLE IF EXISTS `reports_tbl`;
CREATE TABLE IF NOT EXISTS `reports_tbl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `report_text` text NOT NULL,
  `uid` int(5) NOT NULL,
  `report_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reports_tbl`
--

INSERT INTO `reports_tbl` (`id`, `report_text`, `uid`, `report_date`) VALUES
(1, 'This is my text', 1, '2020-05-19'),
(2, 'This is your text', 2, '2020-05-19');

-- --------------------------------------------------------

--
-- Table structure for table `users_tbl`
--

DROP TABLE IF EXISTS `users_tbl`;
CREATE TABLE IF NOT EXISTS `users_tbl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_category` int(5) NOT NULL,
  `user_tel` varchar(15) NOT NULL,
  `user_emergency_tel` varchar(15) NOT NULL,
  `user_location` int(5) NOT NULL,
  `user_destination` int(5) NOT NULL,
  `user_reg_date` date NOT NULL,
  `user_bus_id` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_tbl`
--

INSERT INTO `users_tbl` (`id`, `user_category`, `user_tel`, `user_emergency_tel`, `user_location`, `user_destination`, `user_reg_date`, `user_bus_id`) VALUES
(1, 1, '677777777', '655555555', 1, 7, '2020-05-19', 'CE 675 TY'),
(2, 1, '677777777', '655555555', 4, 8, '2020-05-19', 'LT 683 OP');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
