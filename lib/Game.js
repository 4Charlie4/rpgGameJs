const inquirer = require("inquirer");
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

        this.startNewBattle();

        console.log(this.startNewBattle());
      });
  };

  //starts Each battle with enemy
  Game.prototype.startNewBattle = function () {
    if (this.player.agility > this.currentEnemy.agility) {
      this.isPlayerTurn = true;
    } else {
      this.isPlayerTurn = false;
    }

    console.log("Stats:");
    //Presents stats in a table
    console.table(this.player.getStats());

    console.log(this.currentEnemy.getDescription());
    //Will run the next round
    this.battle();
  };

  Game.prototype.battle = function () {
    if (this.isPlayerTurn) {
      //player turn
      inquirer
        .prompt({
          type: "list",
          message: "What would you like to do?",
          name: "action",
          choices: ["attack", "Use potion"],
        })
        .then(({ action }) => {
          if (action === "Use potion") {
            if (!this.player.getInventory()) {
              console.log("You don't have any potion!");
              return;
            }
            inquirer.prompt({
              type: "list",
              message: "Which potion would you like to use?",
              name: "action",
              choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
            })
            .then(({action}) => {
                const potionDetails = action.split(": ");

                this.player.usePotion(potionDetails[0] - 1);
                console.log(`You used a ${potionDetails[1]} potion.`)
            })
          }
        });
    } else {
      const damage = this.currentEnemy.getAttackValue();
      this.player.reduceHealth(damage);

      console.log(`You were Attacked by the ${this.currentEnemy.name}`);
      console.log(this.player.getHealth());
    }
  };
}

module.exports = Game;
