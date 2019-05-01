-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 25, 2019 at 05:15 PM
-- Server version: 5.7.24
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `locomotive`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` text,
  `password` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `username`, `password`) VALUES
(1, 'admin', '4297f44b13955235245b2497399d7a93');

-- --------------------------------------------------------

--
-- Table structure for table `job_applicants`
--

DROP TABLE IF EXISTS `job_applicants`;
CREATE TABLE IF NOT EXISTS `job_applicants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `job_id` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `description` text,
  `payment_status` int(11) DEFAULT '0',
  `cancellation_date` text,
  `store_id` int(11) DEFAULT NULL,
  `applied_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `job_applicants`
--

INSERT INTO `job_applicants` (`id`, `user_id`, `job_id`, `status`, `description`, `payment_status`, `cancellation_date`, `store_id`, `applied_date`) VALUES
(1, 5, 1, 0, 'dakfljdsafl', 0, '2019-03-10', 1, NULL),
(2, 6, 2, 0, NULL, 0, NULL, 1, NULL),
(4, 7, 3, 1, NULL, 0, NULL, 1, NULL),
(5, 1, 2, 0, NULL, 0, NULL, 1, NULL),
(6, 1, 2, 2, 'dakjflsjalj', 0, NULL, 1, NULL),
(7, 1, 1, 3, 'dakfljdsafl', 0, NULL, 1, NULL),
(8, 1, 2, 0, NULL, 0, NULL, 1, NULL),
(9, 5, 2, 0, NULL, 0, NULL, 1, NULL),
(10, 4, 2, 0, NULL, 0, NULL, NULL, NULL),
(11, 2, 2, 0, NULL, 0, NULL, NULL, NULL),
(12, 1, 2, 0, NULL, 0, NULL, 1, NULL),
(13, 1, 2, 0, NULL, 0, NULL, 1, NULL),
(14, 1, 2, 0, NULL, 0, NULL, 1, NULL),
(15, 1, 2, 0, NULL, 0, NULL, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `job_preferences`
--

DROP TABLE IF EXISTS `job_preferences`;
CREATE TABLE IF NOT EXISTS `job_preferences` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `country` text,
  `distance` text,
  `testing_time` text,
  `min_weekday_amount` text,
  `min_weekend_amount` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `job_preferences`
--

INSERT INTO `job_preferences` (`id`, `user_id`, `start_date`, `end_date`, `country`, `distance`, `testing_time`, `min_weekday_amount`, `min_weekend_amount`) VALUES
(1, 3, '2019-02-02', '2019-02-20', 'Pakistan', '5', '60 Mins', '100', '350');

-- --------------------------------------------------------

--
-- Table structure for table `locom_jobs`
--

DROP TABLE IF EXISTS `locom_jobs`;
CREATE TABLE IF NOT EXISTS `locom_jobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` int(11) DEFAULT NULL,
  `job_id` text,
  `job_title` text,
  `country` text,
  `city` text,
  `distance` text,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `perday_amount` text,
  `start_time` text,
  `end_time` text,
  `min_weekday_amount` text,
  `min_weekend_amount` text,
  `testing_time` text,
  `job_detail` text NOT NULL,
  `payment_status` int(11) NOT NULL DEFAULT '0',
  `no_posts` int(11) DEFAULT NULL,
  `skills` text,
  `address` text,
  `parking` varchar(11) NOT NULL DEFAULT '0',
  `pre_test` varchar(11) NOT NULL DEFAULT '0',
  `field_test` varchar(11) NOT NULL DEFAULT '0',
  `phorotoper` varchar(11) NOT NULL DEFAULT '0',
  `trail_frame` varchar(11) NOT NULL DEFAULT '0',
  `intrested` text,
  `contact_lens` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `locom_jobs`
--

INSERT INTO `locom_jobs` (`id`, `store_id`, `job_id`, `job_title`, `country`, `city`, `distance`, `start_date`, `end_date`, `perday_amount`, `start_time`, `end_time`, `min_weekday_amount`, `min_weekend_amount`, `testing_time`, `job_detail`, `payment_status`, `no_posts`, `skills`, `address`, `parking`, `pre_test`, `field_test`, `phorotoper`, `trail_frame`, `intrested`, `contact_lens`) VALUES
(1, 1, 'job-09992', 'Optical World Test London', 'Pakistan', 'Islamabad', '2.1', '2019-02-02', '2019-02-20', '300', '6:00 PM', '6:00 PM', '100', '350', '30 Mins', 'dhkfahkfkadsjfhkjdshkasdkjffsdlkfjksdhfkas\r\ndfnkjdksfkjsdkkbaskvbvkdsbvka\r\nnkjfdnvkadfkjvasdkbvka]vnd\r\nd\r\ndsnvkasndvknasdskvnas\r\ndvndkvjnasdkjnvkjdanvkad\r\nvncvnkadjnvkjfdnkva\r\nvncvndkfnvvdannasdkjnvkvkfa\r\navndkjsavnvkjdsnfkjfnadskva\r\nvcnxkjvnkadnvkjdlvadv\r\ndvnfnvsdnkvvdkvkjndkvnkanvk\r\nvkjavnkjaj', 0, NULL, NULL, NULL, '0', '0', '0', '0', '0', NULL, NULL),
(2, 1, 'job-21212', 'Boots Opticaians', 'Pakistan', 'Islamabad', '2.1', '2019-02-02', '2019-02-20', '300', '6:00 PM', '6:00 PM', '100', '350', '30 Mins', 'dhkfahkfkadsjfhkjdshkasdkjffsdlkfjksdhfkas\r\ndfnkjdksfkjsdkkbaskvbvkdsbvka\r\nnkjfdnvkadfkjvasdkbvka]vnd\r\nd\r\ndsnvkasndvknasdskvnas\r\ndvndkvjnasdkjnvkjdanvkad\r\nvncvnkadjnvkjfdnkva\r\nvncvndkfnvvdannasdkjnvkvkfa\r\navndkjsavnvkjdsnfkjfnadskva\r\nvcnxkjvnkadnvkjdlvadv\r\ndvnfnvsdnkvvdkvkjndkvnkanvk\r\nvkjavnkjaj', 0, NULL, NULL, NULL, '0', '0', '0', '0', '0', '11', NULL),
(4, 1, 'BCD-0001', 'test', 'Pakistan', NULL, '2', '2019-02-02', '2019-03-30', '500', '6:00 PM', '6:00 PM', '100', '350', '30 Mins', 'fkdsjflaflkjlajfladf', 0, NULL, NULL, ' bacddsdjfjdlafjljflaldsf', '1', '1', '1', '1', '1', NULL, NULL),
(5, 1, 'BCD-0001212', 'test', 'Pakistan', NULL, '2', '2018-12-31', '2019-01-30', '500', '6:00 PM', '6:00 PM', '100', '350', '30 Mins', 'fkdsjflaflkjlajfladf', 0, NULL, NULL, ' bacddsdjfjdlafjljflaldsf', '1', '1', '1', '1', '1', NULL, NULL),
(6, 3, 'Job-19299', NULL, 'Pakistan', NULL, '3', '2019-03-20', '2019-03-30', '400', '6:00 PM', '6:00 PM', '100', '350', '30 Mins', 'tste', 0, NULL, 'test', NULL, '0', '0', '0', '0', '0', NULL, NULL),
(7, 2, 'Job-2990', NULL, 'Pakistan', NULL, '4', '2019-03-01', '2019-03-15', '100', '6:00 PM', '6:00 PM', '100', '350', '30 Mins', 'testing', 0, NULL, 'tesing', NULL, '0', '0', '0', '0', '0', NULL, NULL),
(9, 1, 'Job-8888', NULL, 'Pakistan', NULL, '2', '2019-03-01', '2019-05-31', '30000', '6:00 PM', '6:00 PM', '100', '350', '30 Mins', 'ddfjdjaflajflj', 0, 8, 'Developer', NULL, '1', '1', '', '', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `locom_profiles`
--

DROP TABLE IF EXISTS `locom_profiles`;
CREATE TABLE IF NOT EXISTS `locom_profiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `date_of_birth` text,
  `address` text,
  `goc_number` text,
  `opl_number` text,
  `insurance_company` text,
  `insurance_no` text,
  `profile_photo` text,
  `equipment_preferred` text,
  `skills` text,
  `year_of_experience` text,
  `preferred_testing_time` text,
  `opl_proof` varchar(100) DEFAULT NULL,
  `goc_proof` varchar(100) DEFAULT NULL,
  `insurance_proof` varchar(200) DEFAULT NULL,
  `latitude` varchar(100) DEFAULT NULL,
  `longitude` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `locom_profiles`
--

INSERT INTO `locom_profiles` (`id`, `user_id`, `date_of_birth`, `address`, `goc_number`, `opl_number`, `insurance_company`, `insurance_no`, `profile_photo`, `equipment_preferred`, `skills`, `year_of_experience`, `preferred_testing_time`, `opl_proof`, `goc_proof`, `insurance_proof`, `latitude`, `longitude`) VALUES
(5, 7, '1990-01-10', 'hfjahdjfhaj', 'fjadhfjkah', '1970-01-01', 'NGI', '382380298', NULL, 'dfjajf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 5, '1970-01-01', 'abc', '', '1970-01-01', 'EFU', '6312683', NULL, '', NULL, '6', NULL, NULL, NULL, NULL, NULL, NULL),
(4, 6, '1990-03-10', 'abcd', '', '1970-01-01', 'NGI', '4234879', NULL, 'EFWER', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 4, '2000-03-10', 'acvv', '364646', '5454646', 'Uexel', '44645', 'http://localhost/upload/shahshk.jpg', 'tesst', NULL, '5 Year', '4:00 PM', NULL, NULL, NULL, NULL, NULL),
(7, 4, '2000-03-10', 'acvv', '364646', '5454646', 'Uexel', '44645', 'http://localhost/upload/shahshk.jpg', 'tesst', NULL, '5 Year', '4:00 PM', NULL, NULL, NULL, NULL, NULL),
(8, 8, '2019-04-22', 'bC', '2312321', '1970-01-01', 'Jublee', '12121', 'http://localhost/locomotive/uploads/', 'ETST', NULL, NULL, NULL, 'http://localhost/locomotive/uploads/', 'http://localhost/locomotive/uploads/', 'http://localhost/locomotive/uploads/', NULL, NULL),
(9, 9, '2000-03-10', 'acvv', '364646', '5454646', 'Uexel', '44645', 'http://localhost/upload/shahshk.jpg', 'tesst', NULL, '5 Year', '4:00 PM', 'http://localhost/locomotive/uploads/', 'http://localhost/locomotive/uploads/', 'http://localhost/locomotive/uploads/', NULL, NULL),
(10, 10, '2019-03-31', 'abcd', '328739', '1970-01-01', 'NGI', '779797', 'http://localhost/locomotive/uploads/Ayeen.jpeg', 'ehjhfha', NULL, NULL, NULL, 'http://localhost/locomotive/uploads/abstract_interface.PNG', 'http://localhost/locomotive/uploads/Capture1.PNG', 'http://localhost/locomotive/uploads/Capture.PNG', NULL, NULL),
(11, 4, '2000-03-10', 'acvv', '364646', '5454646', 'Uexel', '44645', 'http://localhost/upload/shahshk.jpg', 'tesst', NULL, '5 Year', '4:00 PM', 'http://localhost/upload/file', 'http://localhost/upload/file', 'http://localhost/upload/file', NULL, NULL),
(12, 4, '2000-03-10', 'acvv', '364646', '5454646', 'Uexel', '44645', 'http://localhost/upload/shahshk.jpg', 'tesst', NULL, '5 Year', '4:00 PM', 'http://localhost/upload/undefined', 'http://localhost/upload/undefined', 'http://localhost/upload/undefined', NULL, NULL),
(13, 4, '2000-03-10', 'acvv', '364646', '5454646', 'Uexel', '44645', 'http://localhost/upload/shahshk.jpg', 'tesst', NULL, '5 Year', '4:00 PM', 'http://localhost/upload/undefined', 'http://localhost/upload/undefined', 'http://localhost/upload/undefined', NULL, NULL),
(14, 4, '2000-03-10', 'acvv', '364646', '5454646', 'Uexel', '44645', 'http://localhost/upload/shahshk.jpg', 'tesst', NULL, '5 Year', '4:00 PM', 'http://localhost/upload/undefined', 'http://localhost/upload/undefined', 'http://localhost/upload/undefined', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `locom_reviews`
--

DROP TABLE IF EXISTS `locom_reviews`;
CREATE TABLE IF NOT EXISTS `locom_reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `review_id` int(11) DEFAULT NULL,
  `job_id` int(11) DEFAULT NULL,
  `name` text,
  `review_description` text,
  `conversion_stars` text,
  `punctuality_stars` text,
  `customer_service_stars` text,
  `review_stars` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `locom_reviews`
--

INSERT INTO `locom_reviews` (`id`, `user_id`, `review_id`, `job_id`, `name`, `review_description`, `conversion_stars`, `punctuality_stars`, `customer_service_stars`, `review_stars`) VALUES
(1, 5, 2, NULL, 'Ayeen Khan', 'Testing this profile', NULL, NULL, NULL, '5'),
(2, 5, 2, NULL, 'Ayeen Khan', 'Testing this profile', NULL, NULL, NULL, '5'),
(3, 5, 2, NULL, 'Ayeen Khan', 'Testing this profile', NULL, NULL, NULL, '5'),
(4, 1, 2, NULL, 'Ayeen Khan', 'Testing this profile', '5', '4', '3.5', '5'),
(5, 3, 2, 2, 'Ayeen Khan', 'Testing this profile', '5', '4', '3.5', '5'),
(6, 3, 2, 2, 'Ayeen Khan', 'Testing this profile', '5', '4', '3.5', '4.166666666666667'),
(7, 3, 2, 2, 'Ayeen Khan', 'Testing this profile', '5', '4', '3.5', '4.166666666666667'),
(8, 13, 2, 2, 'Ayeen Khan', 'Testing this profile', '5', '4', '4', '4.333333333333333'),
(9, 13, 2, 2, 'Ayeen Khan', 'Testing this profile', '5', '5', '5', '5'),
(10, 13, 2, 2, 'Ayeen Khan', 'Testing this profile', '5', '5', '5', '5'),
(11, 13, 2, 2, 'Ayeen Khan', 'Testing this profile', '5', '5', '5', '5'),
(12, 13, 2, 2, 'Ayeen Khan', 'Testing this profile', '5', '5', '5', '5'),
(13, 12, 2, 5, 'Ayeen Khan', 'Testing this profile', '5', '5', '5', '5'),
(14, 12, 2, 5, 'Ayeen Khan', 'Testing this profile', '5', '5', '5', '5'),
(15, 12, 2, 5, 'Ayeen Khan', 'Testing this profile', '5', '5', '5', '5'),
(16, 12, 2, 5, 'Ayeen Khan', 'Testing this profile', '5', '5', '5', '5');

-- --------------------------------------------------------

--
-- Table structure for table `locom_skills`
--

DROP TABLE IF EXISTS `locom_skills`;
CREATE TABLE IF NOT EXISTS `locom_skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `skill_name` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `locom_skills`
--

INSERT INTO `locom_skills` (`id`, `user_id`, `skill_name`) VALUES
(15, 7, 'Animator'),
(8, 5, 'R'),
(9, 5, 'R'),
(10, 5, 'R'),
(12, 6, 'Research'),
(13, 6, 'Animator'),
(16, 8, 'developer'),
(17, 8, 'Designer'),
(50, 9, 'NODE'),
(49, 4, 'Nodejs'),
(20, 10, 'developer'),
(21, 10, 'Designer'),
(51, 9, 'Mysql'),
(48, 4, 'Mysql'),
(47, 4, 'NODE'),
(46, 4, 'Nodejs');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `message` text,
  `type` varchar(100) DEFAULT NULL,
  `submission_date` timestamp NULL DEFAULT NULL,
  `reciepents` varchar(100) DEFAULT NULL,
  `job_id` int(11) DEFAULT NULL,
  `store_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `title`, `message`, `type`, `submission_date`, `reciepents`, `job_id`, `store_id`) VALUES
(1, 'Test Email', 'hello this test email', '', '2019-04-01 19:00:00', '2', NULL, NULL),
(2, 'Test Email', 'hello this test email', '', '2019-04-01 19:00:00', '7', NULL, NULL),
(3, 'Test Email', 'hello this test email', '', '2019-04-01 19:00:00', '5', NULL, NULL),
(4, 'Test Email', 'hello this test email', '', '2019-04-01 19:00:00', '6', NULL, NULL),
(6, 'test', 'test', 'Email', '2019-04-07 19:00:00', '0', NULL, NULL),
(7, 'test', 'test', 'Email', '2019-04-07 19:00:00', '1', NULL, NULL),
(11, NULL, 'Your job application is approved', NULL, NULL, '3', 2, NULL),
(10, NULL, 'Your job application is Rejected', NULL, NULL, '3', 1, NULL),
(12, NULL, 'Successfuly applied for job', NULL, NULL, '1', 2, NULL),
(13, NULL, 'Store give you review on your job application', NULL, NULL, '12', 5, NULL),
(14, NULL, 'Store give you review on your job application', NULL, NULL, '12', 5, NULL),
(15, NULL, 'Store give you review on your job application', NULL, NULL, '12', 5, NULL),
(16, NULL, 'New Application Recieved for the job', NULL, NULL, NULL, 2, '1'),
(17, NULL, 'New Application Recieved for the job', NULL, NULL, NULL, 2, '1'),
(18, NULL, 'New Application Recieved for the job', NULL, NULL, NULL, 2, '1');

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
CREATE TABLE IF NOT EXISTS `skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `skill_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`id`, `skill_name`) VALUES
(1, 'Nodjes');

-- --------------------------------------------------------

--
-- Table structure for table `store_profiles`
--

DROP TABLE IF EXISTS `store_profiles`;
CREATE TABLE IF NOT EXISTS `store_profiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `store_name` text,
  `address` text,
  `weekend_rate` text,
  `weekday_rate` text,
  `equipment` text,
  `preferred_testing_time` text,
  `parking_available` text,
  `pre_test_required` text,
  `detail` text,
  `latitude` text,
  `longitude` text,
  `total_jobs_posted` int(11) DEFAULT NULL,
  `field_test` varchar(45) DEFAULT NULL,
  `phoropter` varchar(45) DEFAULT NULL,
  `trail_frame` varchar(45) DEFAULT NULL,
  `contact_lens` varchar(45) DEFAULT NULL,
  `profile_picture` text,
  `fcm_token` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `store_profiles`
--

INSERT INTO `store_profiles` (`id`, `user_id`, `store_name`, `address`, `weekend_rate`, `weekday_rate`, `equipment`, `preferred_testing_time`, `parking_available`, `pre_test_required`, `detail`, `latitude`, `longitude`, `total_jobs_posted`, `field_test`, `phoropter`, `trail_frame`, `contact_lens`, `profile_picture`, `fcm_token`) VALUES
(1, 2, 'Gulzary optics', 'Islamabad', '1000', NULL, 'dfjhdf', NULL, '1', '1', 'dhakjfhkaf', NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 5, 'Emarates', 'dfadfbaddfjabfj', '3123', NULL, 'afafaa', NULL, NULL, NULL, '6328631868', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 2, 'Gulzary optics', 'Islamabad', '1000', '500', 'dfjhdf', NULL, '1', '1', 'dhakjfhkaf', '53.25655558', '73.25655888', NULL, '1', '1', '1', '', NULL, NULL),
(5, 2, 'Gulzary optics', 'Islamabad', '1000', '500', 'dfjhdf', NULL, '1', '1', 'dhakjfhkaf', '53.25655558', '73.25655888', NULL, '1', '1', '1', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` text,
  `last_name` text,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone_no` text,
  `tc_box` varchar(100) NOT NULL,
  `user_type` enum('1','0') DEFAULT NULL,
  `verification_code` text,
  `is_verified` int(11) NOT NULL DEFAULT '0',
  `latitude` varchar(100) DEFAULT NULL,
  `longitude` varchar(100) DEFAULT NULL,
  `fcm_token` text,
  `profile_review` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `password`, `phone_no`, `tc_box`, `user_type`, `verification_code`, `is_verified`, `latitude`, `longitude`, `fcm_token`, `profile_review`) VALUES
(12, ' Ayeen', 'Khan', 'ayeenmuhammad@gmail.com', '$2b$10$C94AyC4BIScu9eY1j8Inku1jiP7W5izTP6P9Lgla2zShfIqgi96uC', '033433333', 'tedttt', '1', '8470', 1, NULL, NULL, 'eKjYhLetZ5A:APA91bFSqQJLI0pdn-Oi6ayqB2YoPmsE6FJhX-mUx2ebcsf6masRA-hG6YDWAzEsLhe1w1LumCSqmXTSTbpUfBNTayLOZ3U8YMsLLS-9al0gN6GlZh48hHuURhYRxTOZe8oRTDRC641v', '5'),
(7, 'Mansoor', 'Khan', 'mansoor@gmail.com', '$2y$11$OFsIqeEy.nmbdULra/.giu.PkH0Qq7wR/MrNQlFR81TrqaAvBReU6', '0303393939', '2121212', '1', NULL, 1, '31.5204', '74.3587', NULL, NULL),
(5, 'Aamir', 'Ali', 'admin@gotripcabs.com', '4297f44b13955235245b2497399d7a93', '09447477', '647623786', '1', NULL, 1, '33.6887', '73.0328', NULL, NULL),
(6, 'Salman', 'khan', 'customer@gotripcabs.com', '4297f44b13955235245b2497399d7a93', '90934909', '648723648', '1', NULL, 1, '33.5961', '73.0538', NULL, NULL),
(8, 'Muhammad Khan', 'khan', 'abcd@gmail.com', '$2y$11$e3UCy22nTl4bAWxcITmwm.JwctYsamr4Zznu8jcwKYdQkClmrypES', '213323', '2212211', '1', NULL, 1, '34.1688', '73.2215', NULL, NULL),
(10, 'Ahmed', 'Shah', 'test@gmail.com', '$2y$11$Nac/k5oI.OZzKC/E1yihHO8mInXC4u48lH/z4rkUKf.gGuWYXQwBW', '372837298', '1234444', '0', NULL, 1, '33.6887', '73.0328', NULL, NULL),
(13, ' Ayeen', 'Khan', 'bano.nahida6@gmail.com', '$2b$10$YxO9p4MgnqVJtF0rf7nuX.5Z0pKae/zqnwLl/oK4isd.HL9hxuUwu', '033433333', 'tedttt', '1', '4553', 0, NULL, NULL, NULL, '4.866666666666666');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
