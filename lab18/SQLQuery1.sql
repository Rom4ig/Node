create table Faculties (
Faculty nvarchar (50) primary key,
Faculty_name nvarchar (50)
)

create table Pulpits (
Pulpit nvarchar (50) primary key,
Pulpit_name nvarchar (50),
Faculty nvarchar (50)
)

create table Teachers (
Teacher nvarchar (50) primary key,
Teacher_name nvarchar (50),
Pulpit nvarchar (50)
)


create table Subjects (
Subject nvarchar (50) primary key,
Subject_name nvarchar (50),
Pulpit nvarchar (50)
)