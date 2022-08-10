const Potion = require("../lib/Potion");

function Player(name = "player") {
  this.name = name;

  this.health = Math.floor(Math.random() * 10 + 95);
  this.strength = Math.floor(Math.random() * 5 + 7);
  this.agility = Math.floor(Math.random() * 5 + 7);

  //For testing it is using mock potion
  this.inventory = [new Potion("health"), new Potion()];
}

module.exports = Player;
