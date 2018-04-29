
--
-- Database: `restoran`
--

-- --------------------------------------------------------

--
-- Table structure for table `basketoptions`
--

CREATE TABLE `basketoptions` (
  `basketOptionID` int(11) NOT NULL,
  `basketID` int(11) NOT NULL,
  `optionID` int(11) NOT NULL,
  `optionValueID` int(11) NOT NULL,
  `price` double NOT NULL,
  `piece` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `baskets`
--

CREATE TABLE `baskets` (
  `basketID` int(11) NOT NULL,
  `orderID` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `piece` int(11) NOT NULL,
  `price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Dumping data for table `baskets`
--

INSERT INTO `baskets` (`basketID`, `orderID`, `productID`, `piece`, `price`) VALUES
(1, 22, 1, 3, 12.5),
(2, 22, 1, 5, 12.5),
(3, 21, 1, 50, 12.5);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `categoryID` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `sort` int(11) NOT NULL,
  `image` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `parentID` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`categoryID`, `name`, `sort`, `image`, `parentID`, `date`) VALUES
(2, 'İçecekler', 1, 'http://www.mersinozkaymakdondurmalari.com/File_Uploadx/Sayfa/Buyuk/mersin-ozkaymak-icecekler-893498.jpg', 0, '2017-05-02 18:59:24'),
(3, 'Ana Yemekler', 0, 'http://s.eatthis-cdn.com/media/images/ext/336492655/fast-food.jpg', 0, '2017-05-02 18:59:24');

-- --------------------------------------------------------

--
-- Table structure for table `desks`
--

CREATE TABLE `desks` (
  `desksID` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `tempID` int(11) NOT NULL,
  `deleteAt` varchar(255) COLLATE utf8_turkish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Dumping data for table `desks`
--

INSERT INTO `desks` (`desksID`, `name`, `tempID`, `deleteAt`) VALUES
(1, 'Masa 1', 20, '0'),
(2, 'Masa 2', 0, '0');

-- --------------------------------------------------------

--
-- Table structure for table `optionsofproduct`
--

CREATE TABLE `optionsofproduct` (
  `optionOfProductID` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `optionID` int(11) NOT NULL,
  `sort` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Dumping data for table `optionsofproduct`
--

INSERT INTO `optionsofproduct` (`optionOfProductID`, `productID`, `optionID`, `sort`) VALUES
(1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderID` int(11) NOT NULL,
  `tempDeskID` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `time` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderID`, `tempDeskID`, `status`, `time`, `date`) VALUES
(1, 1, 3, 0, '2017-05-27 13:23:43'),
(2, 1, 0, 0, '2017-05-27 13:23:43'),
(3, 1, 0, 0, '2017-05-27 13:23:43'),
(4, 1, 0, 0, '2017-05-27 13:23:43'),
(5, 1, 0, 0, '2017-05-27 13:23:43'),
(6, 1, 0, 0, '2017-05-27 13:23:43'),
(7, 1, 0, 0, '2017-05-27 13:23:43'),
(8, 1, 0, 0, '2017-05-27 13:23:43'),
(9, 1, 0, 0, '2017-05-27 13:23:43'),
(10, 1, 0, 0, '2017-05-27 13:23:43'),
(11, 1, 0, 0, '2017-05-27 13:23:43'),
(12, 1, 3, 0, '2017-05-27 13:23:43'),
(13, 1, 0, 0, '2017-05-27 13:23:43'),
(14, 1, 0, 0, '2017-05-27 13:23:43'),
(15, 1, 0, 0, '2017-05-27 13:23:43'),
(16, 1, 0, 0, '2017-05-27 13:23:43'),
(17, 1, 0, 0, '2017-05-27 13:23:43'),
(18, 2, 0, 0, '2017-05-27 13:23:43'),
(19, 2, 0, 0, '2017-05-27 13:23:43'),
(20, 2, 8, 0, '2017-05-27 13:23:43'),
(21, 20, 0, 0, '2017-05-27 13:23:43'),
(22, 20, 3, 0, '2017-05-27 13:23:43');

-- --------------------------------------------------------

--
-- Table structure for table `productimages`
--

CREATE TABLE `productimages` (
  `imageID` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `image` varchar(255) COLLATE utf8_turkish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Dumping data for table `productimages`
--

INSERT INTO `productimages` (`imageID`, `productID`, `image`) VALUES
(1, 1, 'http://cdn.yemek.com/mnresize/940/627/uploads/2016/04/sebzeli-tavuk-sote.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `productoptions`
--

CREATE TABLE `productoptions` (
  `optionID` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Dumping data for table `productoptions`
--

INSERT INTO `productoptions` (`optionID`, `name`, `type`) VALUES
(1, 'Ekstra Sos', 1);

-- --------------------------------------------------------

--
-- Table structure for table `productoptionvalues`
--

CREATE TABLE `productoptionvalues` (
  `optionValueID` int(11) NOT NULL,
  `value` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `price` double NOT NULL,
  `optionID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Dumping data for table `productoptionvalues`
--

INSERT INTO `productoptionvalues` (`optionValueID`, `value`, `price`, `optionID`) VALUES
(1, 'Domates Sosu', 2.2, 1),
(2, 'Acı Sos', 1.99, 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productID` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `category` int(11) NOT NULL,
  `price` double NOT NULL,
  `description` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `date` date NOT NULL,
  `deleteAt` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `stars` double NOT NULL,
  `startsCount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productID`, `name`, `category`, `price`, `description`, `date`, `deleteAt`, `stars`, `startsCount`) VALUES
(1, 'Tavuk Sote', 2, 12.5, 'Özel soslar ile hazırlanmış nefis tavuk sote', '2017-05-02', '', 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tempdesks`
--

CREATE TABLE `tempdesks` (
  `tempDeskID` int(11) NOT NULL,
  `deskID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Dumping data for table `tempdesks`
--

INSERT INTO `tempdesks` (`tempDeskID`, `deskID`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(16, 1),
(17, 1),
(18, 1),
(19, 1),
(20, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `rank` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `basketoptions`
--
ALTER TABLE `basketoptions`
  ADD PRIMARY KEY (`basketOptionID`);

--
-- Indexes for table `baskets`
--
ALTER TABLE `baskets`
  ADD PRIMARY KEY (`basketID`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categoryID`);

--
-- Indexes for table `desks`
--
ALTER TABLE `desks`
  ADD PRIMARY KEY (`desksID`);

--
-- Indexes for table `optionsofproduct`
--
ALTER TABLE `optionsofproduct`
  ADD PRIMARY KEY (`optionOfProductID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderID`);

--
-- Indexes for table `productimages`
--
ALTER TABLE `productimages`
  ADD PRIMARY KEY (`imageID`);

--
-- Indexes for table `productoptions`
--
ALTER TABLE `productoptions`
  ADD PRIMARY KEY (`optionID`);

--
-- Indexes for table `productoptionvalues`
--
ALTER TABLE `productoptionvalues`
  ADD PRIMARY KEY (`optionValueID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productID`);

--
-- Indexes for table `tempdesks`
--
ALTER TABLE `tempdesks`
  ADD PRIMARY KEY (`tempDeskID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `basketoptions`
--
ALTER TABLE `basketoptions`
  MODIFY `basketOptionID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `baskets`
--
ALTER TABLE `baskets`
  MODIFY `basketID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `categoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `desks`
--
ALTER TABLE `desks`
  MODIFY `desksID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `optionsofproduct`
--
ALTER TABLE `optionsofproduct`
  MODIFY `optionOfProductID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `productimages`
--
ALTER TABLE `productimages`
  MODIFY `imageID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `productoptions`
--
ALTER TABLE `productoptions`
  MODIFY `optionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `productoptionvalues`
--
ALTER TABLE `productoptionvalues`
  MODIFY `optionValueID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tempdesks`
--
ALTER TABLE `tempdesks`
  MODIFY `tempDeskID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;
