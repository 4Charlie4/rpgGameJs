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

  //passes value from the param in reduceHealth through here
  Player.prototype.reduceHealth = function (health) {
    this.health -= health;

    if (this.health < 0) {
      this.health = 0;
    }
  };

  Player.prototype.getAttackValue = function () {
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (max - min) + min);
  };

  Player.prototype.addPotion = function (potion) {
    this.inventory.push(potion);
  };

  Player.prototype.usePotion = function (index) {
    
  //Removes potion that is being used in to an array of removed potions
    const potion = this.getInventory().splice(index, 1)[0];

// Assigns the value of the removed potion to the player based on what potion it is.
    switch (potion.name) {
      case "agility":
        this.agility += potion.value;
        break;
      case "health":
        this.health += potion.value;
        break;
      case "strength":
        this.strength += potion.value;
        break;
    }
  };
}

module.exports = Player;
