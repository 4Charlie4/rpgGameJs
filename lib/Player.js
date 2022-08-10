const { FLIPPED_ALIAS_KEYS } = require("@babel/types");
const Potion = require("../lib/Potion");

function Player(name = "player") {
  this.name = name;
  //Player stats
  this.health = Math.floor(Math.random() * 10 + 95);
  this.strength = Math.floor(Math.random() * 5 + 7);
  this.agility = Math.floor(Math.random() * 5 + 7);

  //For testing it is using mock potion
  this.inventory = [new Potion("health"), new Potion()];

  //returns players stats
  Player.prototype.getStats = function () {
    return {
      potions: this.inventory.length,
      health: this.health,
      strength: this.strength,
      agility: this.agility,
    };
  };

  // Returns inventory if there is anything in it
  Player.prototype.getInventory = function () {
    if (this.inventory.length) {
      return this.inventory;
    }
    return false;
  };

  Player.prototype.getHealth = function () {
    return `${this.name}'s health is no ${this.health}!`;
  };

  Player.prototype.isAlive = function () {
    if (this.health === 0) {
      return false;
    }
    return true;
  };

  Player.prototype.reduceHealth = function () {
    this.health -= health;

    if (this.health < 0) {
      this.health = 0;
    }
  };
}

module.exports = Player;
