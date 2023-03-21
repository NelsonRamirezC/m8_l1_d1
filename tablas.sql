CREATE TABLE usuarios(
	id serial primary key,
	nombre varchar(50) not null,
	email varchar(100) not null,
	password varchar(100) not null,
	imagen varchar(100) not null
);