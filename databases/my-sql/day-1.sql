#Create our first database-- 

#CREATE DATABASE students;


#CREATE DATABASE students2;

# Delete database

#DROP DATABASE students;
#DROP DATABASE students2;

#For Now we are going to use our our college database

#create database college;

#-- use database

use college; 

#Creating our first table;

create table student(
id int primary key,
name varchar(50),
age int not null
);


insert into student values(1 , "Suraj" , 20);
insert into student values(2 , "Akash" , 20);


select * from student;
