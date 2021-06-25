-- db schema creation
CREATE SCHEMA `fog_smart_parking_db` DEFAULT CHARACTER SET utf8 ;

-- tabales creations
CREATE TABLE `fog_smart_parking_db`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `userType` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

ALTER TABLE `fog_smart_parking_db`.`user` 
ADD COLUMN `createdAt` TIMESTAMP NULL AFTER `userType`,
ADD COLUMN `updatedAt` TIMESTAMP NULL AFTER `createdAt`;
