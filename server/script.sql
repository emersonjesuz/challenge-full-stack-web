create database academic_module;

create table users (
    id serial primary key,
    email varchar(255) not null unique,
    password varchar(255) not null
 );

create table student (
    registration_number integer  not null,
    email varchar(255) not null,
    name varchar(255) not null,
    cpf varchar(255) not null unique,
    is_delete boolean default false,
    primary key(registration_number)
);

-- #insert a default user
insert into users (email, password) values ('admin@email.com', '$2b$10$2cLJEZ.joI/rJXFpFZG2vu4AhngoYeqbl3vl9q/bHLd6lDNzGMRNG');