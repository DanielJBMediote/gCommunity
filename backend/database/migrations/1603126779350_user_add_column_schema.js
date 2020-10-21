

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserAddColumnSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table
        .integer('avatar_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
    });
  }

  down () {
    this.alter('users', (table) => {
      table.dropColumn('avatar_id');
    });
  }
}

module.exports = UserAddColumnSchema;
