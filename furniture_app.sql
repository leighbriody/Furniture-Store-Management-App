-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2020 at 03:51 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `furniture_app`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllUsers` (IN `user` VARCHAR(20))  NO SQL
BEGIN
SELECT username , firstname , lastname , email , image_url
FROM users 
WHERE users.username != user 
AND username not in 
(select user1 from friends where user2=user 
 union 
 select user2 from friends where user1=user);
 END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_number` int(11) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telephone` varchar(15) NOT NULL,
  `DOB` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employee_number`, `first_name`, `last_name`, `email`, `telephone`, `DOB`) VALUES
(15, 'Billy', 'Gibney', 'Billg@gmail.com', '0861934420', '2000-04-15'),
(18, 'Adam', 'Lawless', 'adaml@gmail.com', '087263612', '2020-04-18'),
(21, 'Adam', 'Lawless', 'adam@gmail.com ', '0875552521', '1999-09-15'),
(23, 'Ryan', 'Matthews', 'Ryan@hotmail.com ', '0896124521', '2000-03-14'),
(24, 'Andy', 'Smith', 'Andy@hotmail.com ', '0824354321', '0000-00-00'),
(25, 'Jason', 'Newman', 'Jason@gmail.com ', '0856527361', '1995-07-15'),
(26, 'Paul', 'O Neil', 'Paul@gmail.com ', '0874255621', '1989-07-03'),
(27, 'Dean', 'Fitzpatrick', 'Dean@hotmail.com ', '0836556521', '0199-12-02'),
(28, 'Bob', 'Briody', 'Bob@gmail.com ', '0876532341', '1991-01-05'),
(29, 'Dylan', 'Molloy', 'Dylan@hotmail.com ', '0866532121', '1986-05-10');

-- --------------------------------------------------------

--
-- Table structure for table `joborders`
--

CREATE TABLE `joborders` (
  `job_orders_id` int(11) NOT NULL,
  `job_order_number` int(10) NOT NULL,
  `customer_name` varchar(50) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `required_by` date DEFAULT NULL,
  `state` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `joborders`
--

INSERT INTO `joborders` (`job_orders_id`, `job_order_number`, `customer_name`, `product_id`, `quantity`, `required_by`, `state`) VALUES
(42, 8, 'ricky singh', 15, 2, '2020-05-13', 'deleted'),
(43, 9, 'Adam Lawless', 11, 1, '2020-05-21', 'finished'),
(44, 10, 'Gillian Fitzpatrick', 10, 5, '2020-05-14', 'finished'),
(47, 11, 'Steven Smith', 15, 3, '2020-05-14', 'finished'),
(48, 12, 'Tommy Daniels', 13, 5, '2020-05-14', 'unfinished'),
(49, 13, 'Billy ', 20, 3, '2020-05-14', 'unfinished');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(20) NOT NULL,
  `product_price` int(11) NOT NULL,
  `time_to_build` float NOT NULL,
  `material_cost` decimal(10,0) NOT NULL,
  `description` varchar(200) NOT NULL,
  `quantity` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_price`, `time_to_build`, `material_cost`, `description`, `quantity`) VALUES
(10, 'Delux bed ', 1000, 10, '100', 'Awsome bed.', 157),
(11, 'Rocking Chair', 300, 10, '100', 'Rocking chair.', 1),
(12, 'Gaming Chair', 300, 5, '100', 'Comfy.', 182),
(13, 'Desk', 50, 1, '10', 'Sturdy.', 190),
(14, 'Tv Stand', 100, 2, '20', 'Stand.', 76),
(15, 'Gaming Sofa', 200, 6, '50', 'sofa', 0),
(16, 'Desk Lamp', 50, 1, '5', 'Bright desk lamp great for study.', 200),
(17, 'Bean Bag Couch.', 150, 5, '15', 'Comfy bean bag couch.', 50),
(18, 'Oak Table', 1000, 10, '200', 'Oak table very sturdy.', 50),
(19, 'Rocking Chair', 300, 5, '100', 'Well built', 100),
(20, 'Study Desk', 20, 2, '4', 'desk.', 2);

-- --------------------------------------------------------

--
-- Table structure for table `timesheets`
--

CREATE TABLE `timesheets` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `job_sheet` varchar(30) NOT NULL,
  `week_ending` date NOT NULL,
  `monday` float(5,2) NOT NULL,
  `tuesday` float(5,2) NOT NULL,
  `wednesday` float(5,2) NOT NULL,
  `thursday` float(5,2) NOT NULL,
  `friday` float(5,2) NOT NULL,
  `saturday` float(5,2) NOT NULL,
  `sunday` float(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `timesheets`
--

INSERT INTO `timesheets` (`id`, `employee_id`, `job_sheet`, `week_ending`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday`) VALUES
(13, 15, '0', '0000-00-00', 1.00, 0.00, 1.00, 1.00, 0.00, 0.00, 0.00),
(14, 18, '0', '2020-05-08', 1.00, 0.00, 0.00, 1.00, 0.00, 1.00, 0.00),
(15, 15, '1', '2020-05-01', 2.00, 2.00, 2.00, 2.00, 2.00, 0.00, 0.00),
(16, 18, '1', '0000-00-00', 2.00, 2.00, 2.00, 2.00, 2.00, 0.00, 0.00),
(17, 18, '9', '2020-05-20', 1.00, 0.00, 0.00, 2.00, 0.00, 0.00, 0.00),
(18, 21, '9', '2020-05-13', 1.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00),
(19, 18, '10', '2020-05-14', 5.00, 0.00, 5.00, 0.00, 5.00, 5.00, 0.00),
(20, 24, '10', '2020-05-14', 5.00, 5.00, 0.00, 5.00, 0.00, 5.00, 0.00),
(21, 26, '10', '2020-05-14', 5.00, 0.00, 0.00, 5.00, 0.00, 0.00, 0.00),
(22, 15, '11', '2020-05-21', 10.00, 0.00, 5.00, 5.00, 0.00, 0.00, 0.00),
(23, 27, '11', '2020-05-21', 5.00, 0.00, 5.00, 0.00, 5.00, 5.00, 0.00),
(24, 26, '11', '2020-05-21', 2.00, 2.00, 2.00, 2.00, 2.00, 0.00, 0.00);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `type` enum('admin','supervisor','','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `username`, `password`, `type`) VALUES
(6, 'Adam', 'lawless', 'admin'),
(9, 'ricky', 'singh', 'admin'),
(10, 'Billy', 'gibney', 'admin'),
(12, 'leigh', '123', 'supervisor'),
(13, 'Bob', '123', 'admin'),
(15, 'Ryan', 'ryan123', 'admin'),
(16, 'Dylan', 'dyaln', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_number`);

--
-- Indexes for table `joborders`
--
ALTER TABLE `joborders`
  ADD PRIMARY KEY (`job_orders_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `timesheets`
--
ALTER TABLE `timesheets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_number` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `joborders`
--
ALTER TABLE `joborders`
  MODIFY `job_orders_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `timesheets`
--
ALTER TABLE `timesheets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `joborders`
--
ALTER TABLE `joborders`
  ADD CONSTRAINT `joborders_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Constraints for table `timesheets`
--
ALTER TABLE `timesheets`
  ADD CONSTRAINT `timesheets_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_number`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
