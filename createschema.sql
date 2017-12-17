CREATE TABLE `users` (
	`idusers` char(36) NOT NULL,
	`firstname` varchar(50) NOT NULL,
	`lastname` varchar(50) NOT NULL,
	`email` varchar(420) NOT NULL UNIQUE,
	`password` char(60) NOT NULL,
	`birthdate` DATE NOT NULL,
	`country` char(2),
	`secure_key` char(60) NOT NULL,
	`date_created` DATETIME NOT NULL,
	`date_updated` DATETIME NOT NULL,
	PRIMARY KEY (`idusers`)
);

CREATE TABLE `companies` (
	`idcompanies` char(36) NOT NULL,
	`name` varchar(60) NOT NULL UNIQUE,
	`plan` int(1) NOT NULL,
	`creator` char(36) NOT NULL,
	`date_created` DATETIME NOT NULL,
	`date_updated` DATETIME NOT NULL,
	PRIMARY KEY (`idcompanies`)
);

CREATE TABLE `companiesdata` (
	`idcompanies` char(36) NOT NULL,
	`title` char(36) NOT NULL,
	`description` varchar(240) NOT NULL,
	`nbemployees` int(11),
	PRIMARY KEY (`idcompanies`)
);

CREATE TABLE `groups` (
	`idgroups` char(36) NOT NULL,
	`plan` int(1) NOT NULL,
	`creator` char(36) NOT NULL,
	`date_created` DATETIME NOT NULL,
	`date_updated` DATETIME NOT NULL,
	PRIMARY KEY (`idgroups`)
);

CREATE TABLE `groupsdata` (
	`idgroups` char(36) NOT NULL,
	`title` varchar(60) NOT NULL,
	`description` varchar(240) NOT NULL,
	PRIMARY KEY (`idgroups`)
);

CREATE TABLE `companiesref` (
	`idref` char(36) NOT NULL,
	`idcompanies` char(36) NOT NULL,
	`name` varchar(240) NOT NULL,
	`value` mediumtext NOT NULL,
	PRIMARY KEY (`idref`)
);

ALTER TABLE `companies` ADD CONSTRAINT `companies_fk0` FOREIGN KEY (`creator`) REFERENCES `users`(`idusers`);

ALTER TABLE `companiesdata` ADD CONSTRAINT `companiesdata_fk0` FOREIGN KEY (`idcompanies`) REFERENCES `companies`(`idcompanies`);

ALTER TABLE `groups` ADD CONSTRAINT `groups_fk0` FOREIGN KEY (`creator`) REFERENCES `users`(`idusers`);

ALTER TABLE `groupsdata` ADD CONSTRAINT `groupsdata_fk0` FOREIGN KEY (`idgroups`) REFERENCES `groups`(`idgroups`);

ALTER TABLE `companiesref` ADD CONSTRAINT `companiesref_fk0` FOREIGN KEY (`idcompanies`) REFERENCES `companies`(`idcompanies`);
