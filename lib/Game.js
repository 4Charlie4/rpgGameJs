const inquirer = require ("inquirer");
const Player = require("./Player");
const Enemy = require("./Enemy");

function Game() {
  this.roundNumber = 0;
  this.isPlayerTurn = false;
  this.enemies = [];
  this.currentEnemy;
  this.player;

  Game.prototype.initializeGame = function () {
    this.enemies.push(new Enemy("goblin", "club"));
    this.enemies.push(new Enemy("Troll", "GreatSword"));
    this.enemies.push(new Enemy("skeleton", "sword"));

    this.currentEnemy = this.enemies[0];

    inquirer
      .prompt({
        type: "text",
        name: "name",
        message: "Please enter a name for you're character.",
      })
      .then(({ name }) => {
        this.player = new Player(name);

        console.log(this.currentEnemy, this.player);
      });
  };
}

module.exports = Game;
