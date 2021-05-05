DROP TABLE IF EXISTS `tickets`;
CREATE TABLE IF NOT EXISTS `tickets`(
	`ticketID` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `title` varchar(255) not null,
    `author` varchar(255) not null,
    `description` varchar(255),
    `time_created` BIGINT NOT NULL,
    `topic` varchar(255) not null,
    `urgency` BIGINT not null,
    `complete` boolean not null)