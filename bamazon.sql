DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Men's Polo", "Clothing", 39.99, 20),
("Women's Dresses", "Clothing", 79.99, 30),
("Men's Active Shorts", "Clothing", 29.99, 30),
("Women's Active Shorts", "Clothing", 29.99, 30),
("Men's Athletic Shoes", "Shoes", 59.99, 15),
("Women's Athletic Shoes", "Shoes", 49.99, 10),
("Men's Oxfords", "Shoes", 89.99, 10),
("Women's Sandals", "Shoes", 69.99, 10),
("Men's Smart Watch", "Watches", 199.99, 18),
("Women's Smart Watch", "Watches", 199.99, 12),
("Men's Dress Belt", "Accessories", 29.99, 10),
("Women's Hat", "Accessories", 19.99, 9),
("Men's Sunglasses", "Accessories", 99.99, 8),
("Women's Sunglasses", "Accessories", 149.99, 16),
("Kid's Crocs", "Shoes", 29.99, 8)
