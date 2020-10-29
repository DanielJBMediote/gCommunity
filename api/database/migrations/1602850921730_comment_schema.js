

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CommentSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.increments();
      table.string('description').notNullable();
      table.integer('num_likes').defaultTo(0);
      table.integer('num_deslikes').defaultTo(0);
      table
        .integer('post_id')
        .unsigned()
        .references('id')
        .inTable('posts')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down () {
    this.drop('comments');
  }
}

module.exports = CommentSchema;
