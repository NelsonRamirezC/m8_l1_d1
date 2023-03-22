CREATE TABLE usuarios(
	id serial primary key,
	nombre varchar(50) not null,
	email varchar(100) not null,
	password varchar(100) not null,
	imagen varchar(100) not null
);


CREATE TABLE productos(
	id serial primary key,
	nombre varchar(50) not null,
	descripcion varchar(500) not null,
	precio decimal not null default 0 check(precio >=0),
	stock int not null default 0 check(stock>=0),
	imagen VARCHAR(500)
);