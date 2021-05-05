DROP TABLE IF EXISTS `Tickets`;
CREATE TABLE IF NOT EXISTS `Tickets`(
	`ticketid` integer AUTO_INCREMENT,
    `author` varchar(255) not null,
    `complete` long not null,
    `description` text,
    `time_created` INT NOT NULL,
    `title` varchar(255) not null,
    `topic` varchar(255) not null,
    `urgency` long not null,
    PRIMARY KEY (ticketid)
    )
    