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
    cart VARCHAR(1000),

    PRIMARY KEY(orderId)
)