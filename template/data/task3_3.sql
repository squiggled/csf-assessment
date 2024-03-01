-- TODO Task 3
drop database if EXISTS csforders;

create database csforders;
use csforders;

CREATE TABLE orders(
    orderId VARCHAR(26) NOT NULL,
    date DATE,
    name VARCHAR(128) NOT NULL,
    address VARCHAR(128) NOT NULL,
    priority boolean,
    comments VARCHAR(128),

    PRIMARY KEY(orderId)
);

create TABLE lineitems (
    id int auto_increment,
    prodId VARCHAR(200) NOT NULL,
    name VARCHAR(200) NOT NULL,
    quantity INT,
    price float,
    
    PRIMARY KEY(id)
);
grant all privileges on csforders.* to 'newuser';
flush privileges;