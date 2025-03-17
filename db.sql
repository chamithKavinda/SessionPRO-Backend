CREATE DATABASE sessionPro;

CREATE TABLE Session (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    time TIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    duration VARCHAR(50),
    speakerName VARCHAR(255) NOT NULL
);

CREATE TABLE Speaker (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    bio TEXT,
    expertise VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE User (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);


