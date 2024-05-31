-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8mb3 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`gamesettings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`gamesettings` (
  `idGameSettings` INT NOT NULL,
  `GameTime` TIME NULL DEFAULT NULL,
  `PlayerHP` INT NULL DEFAULT NULL,
  `GoldNodeValue` INT NULL DEFAULT NULL,
  `BarracksHP` INT NULL DEFAULT NULL,
  `BarracksCost` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idGameSettings`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`player`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`player` (
  `idPlayer` INT NOT NULL AUTO_INCREMENT,
  `Winrate` INT NULL DEFAULT NULL,
  `UserName` VARCHAR(45) NULL DEFAULT NULL,
  `Email` VARCHAR(45) NULL DEFAULT NULL,
  `Password` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idPlayer`),
  UNIQUE INDEX `idPlayer_UNIQUE` (`idPlayer` ASC) VISIBLE,
  UNIQUE INDEX `UserName_UNIQUE` (`UserName` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 112
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`units`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`units` (
  `idUnits` INT NOT NULL,
  `MeleeHP` INT NULL DEFAULT NULL,
  `MeleeCost` INT NULL DEFAULT NULL,
  `MeleeDmg` INT NULL DEFAULT NULL,
  `RangeHP` INT NULL DEFAULT NULL,
  `RangeDmg` INT NULL DEFAULT NULL,
  `RangeCost` INT NULL DEFAULT NULL,
  `TankHP` INT NULL DEFAULT NULL,
  `TankCost` INT NULL DEFAULT NULL,
  `TankDmg` INT NULL DEFAULT NULL,
  `MinerCost` INT NULL DEFAULT NULL,
  `MinerHP` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idUnits`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`matchsettings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`matchsettings` (
  `idMatchSettings` INT NOT NULL,
  `Map` INT NULL DEFAULT NULL,
  `idPlayers` INT NULL DEFAULT NULL,
  `idUnits` INT NULL DEFAULT NULL,
  `idGamesSettings` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idMatchSettings`),
  INDEX `idGameSettings_idx` (`idGamesSettings` ASC) VISIBLE,
  INDEX `idUnits_idx` (`idUnits` ASC) VISIBLE,
  INDEX `idPlayers_idx` (`idPlayers` ASC) VISIBLE,
  CONSTRAINT `idGameSettings`
    FOREIGN KEY (`idGamesSettings`)
    REFERENCES `mydb`.`gamesettings` (`idGameSettings`),
  CONSTRAINT `idPlayers`
    FOREIGN KEY (`idPlayers`)
    REFERENCES `mydb`.`player` (`idPlayer`),
  CONSTRAINT `idUnits`
    FOREIGN KEY (`idUnits`)
    REFERENCES `mydb`.`units` (`idUnits`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
