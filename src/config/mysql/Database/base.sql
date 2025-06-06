CREATE DATABASE FARMACIA;
USE FARMACIA;

CREATE TABLE MEDICAMENTOS(
	ID              INT AUTO_INCREMENT PRIMARY KEY,
	TIPO            ENUM('Controlado', 'Antibiótico', 'Analgésico') NOT NULL,
	NOMBRE          VARCHAR(120) NOT NULL,
	NOM_COMERCIAL   VARCHAR(40) NOT NULL,
	PRESENTACION    ENUM('Tabletas', 'Cápsulas', 'Blíster') NOT NULL,
	RECETA          ENUM('S', 'N') NOT NULL,
	PRECIO          DECIMAL(7,2) NOT NULL,
	created_at 		DATETIME,
    updated_at 		DATETIME,
    deleted_at 		DATETIME
) ENGINE=INNODB;
