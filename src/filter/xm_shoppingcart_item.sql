/*创建用户购物车商品信息表*/
SET NAMES UTF8;
USE xuezi;
CREATE TABLE xm_shoppingcart_item(
lid INT PRIMARY KEY AUTO_INCREMENT,
uid int(11),
product_id int(11),
count int(11),
is_checked tinyint(1)
);
INSERT INTO `xm_shoppingcart_item` VALUES (null,1,1,1,0);
INSERT INTO `xm_shoppingcart_item` VALUES (null,122,1,1,0);