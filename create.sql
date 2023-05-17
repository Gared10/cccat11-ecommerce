create schema ecommerce;

create table ecommerce.product (
	  id_product integer,
	  description text,
	  price numeric,
  	height numeric,
  	width numeric,
  	product_length numeric,
  	weight numeric
);

insert into ecommerce.product (id_product, description, price, height, width, product_length, weight) values (1, 'Camera', 1000, 10, 15, 20, 1);
insert into ecommerce.product (id_product, description, price, height, width, product_length, weight) values (2, 'Guitarra', 5000, 10, 30, 100, 3);
insert into ecommerce.product (id_product, description, price, height, width, product_length, weight) values (3, 'Geladeira', 8000, 50, 100, 200, 40);

create table ecommerce.coupon (
	  code text,
	  percentage numeric,
  	expiration_date timestamp with time zone
);

insert into ecommerce.coupon (code, percentage, expiration_date) values ('VALE20', 20, '2023-05-01 23:59:59');
insert into ecommerce.coupon (code, percentage, expiration_date) values ('VALE20_2', 20, '2022-05-01 23:59:59');

create table ecommerce.order_header (
	id_order text,
	code text,
	cpf text
)

create table ecommerce.order_items (
	id_product integer,
	id_order text,
	quantity numeric,
	price numeric
)