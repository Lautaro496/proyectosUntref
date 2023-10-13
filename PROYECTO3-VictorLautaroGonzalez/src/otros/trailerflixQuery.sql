CREATE TABLE `Genero` (
	`idGenero` INT NOT NULL AUTO_INCREMENT,
	`genero` varchar(50) NOT NULL,
	PRIMARY KEY (`idGenero`)
);

CREATE TABLE `Catalogo` (
	`idCatalogo` INT NOT NULL AUTO_INCREMENT,
	`poster` varchar(100) NOT NULL,
	`titulo` varchar(50) NOT NULL,
	`categoria` varchar(50) NOT NULL,
	`genero` varchar(50) NOT NULL,
	`resumen` nvarchar(350) NOT NULL,
	`temporadas` INT NOT NULL DEFAULT '0',
	`reparto` varchar(200) NOT NULL,
	`trailer` varchar(100) NOT NULL DEFAULT '"N/A"',
	PRIMARY KEY (`idCatalogo`)
);

CREATE TABLE `CatalogoGenero` (
	`idCatGen` INT NOT NULL AUTO_INCREMENT,
	`idCatalogo` INT NOT NULL,
	`idGenero` INT NOT NULL,
	PRIMARY KEY (`idCatGen`)
);

CREATE TABLE `Categoria` (
	`idCategoria` INT NOT NULL AUTO_INCREMENT,
	`tipoCategoria` varchar(50) NOT NULL,
	PRIMARY KEY (`idCategoria`)
);

CREATE TABLE `CatalogoCategoria` (
	`idCatCateg` INT NOT NULL AUTO_INCREMENT,
	`idCatalogo` INT NOT NULL,
	`idCategoria` INT NOT NULL,
	PRIMARY KEY (`idCatCateg`)
);

CREATE TABLE `CatalogoActricesActores` (
	`idCatAct` INT NOT NULL AUTO_INCREMENT,
	`idCatalogo` INT NOT NULL,
	`idActores` INT NOT NULL,
	PRIMARY KEY (`idCatAct`)
);

CREATE TABLE `ActricesActores` (
	`idActores` INT NOT NULL AUTO_INCREMENT,
	`nombre` nvarchar(50) NOT NULL,
	`apellido` nvarchar(50) NOT NULL,
	PRIMARY KEY (`idActores`)
);

ALTER TABLE `CatalogoGenero` ADD CONSTRAINT `CatalogoGenero_fk0` FOREIGN KEY (`idCatalogo`) REFERENCES `Catalogo`(`idCatalogo`);

ALTER TABLE `CatalogoGenero` ADD CONSTRAINT `CatalogoGenero_fk1` FOREIGN KEY (`idGenero`) REFERENCES `Genero`(`idGenero`);

ALTER TABLE `CatalogoCategoria` ADD CONSTRAINT `CatalogoCategoria_fk0` FOREIGN KEY (`idCatalogo`) REFERENCES `Catalogo`(`idCatalogo`);

ALTER TABLE `CatalogoCategoria` ADD CONSTRAINT `CatalogoCategoria_fk1` FOREIGN KEY (`idCategoria`) REFERENCES `Categoria`(`idCategoria`);

ALTER TABLE `CatalogoActricesActores` ADD CONSTRAINT `CatalogoActricesActores_fk0` FOREIGN KEY (`idCatalogo`) REFERENCES `Catalogo`(`idCatalogo`);

ALTER TABLE `CatalogoActricesActores` ADD CONSTRAINT `CatalogoActricesActores_fk1` FOREIGN KEY (`idActores`) REFERENCES `ActricesActores`(`idActores`);








