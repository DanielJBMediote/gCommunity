/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class GameSchema extends Schema {
  up() {
    this.create('games', (table) => {
      table.increments();
      table.string('name');
      table.timestamps();
    });
  }

  down() {
    this.drop('games');
  }
}

module.exports = GameSchema;
