/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments();
      table.string('username', 80).notNullable();
      table.string('email', 254).notNullable().unique();
      table.string('password', 60).notNullable();
      table.string('fullname', 100);
      table.string('age');

      table.string('token');
      table.timestamp('token_created_at');

      table.boolean('provider').notNullable().defaultTo(false);
      table.boolean('active_status').notNullable().defaultTo(true);
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
