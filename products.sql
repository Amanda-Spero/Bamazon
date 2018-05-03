DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100),
    price DECIMAL(40, 2),
    stock_quantity INT
);

