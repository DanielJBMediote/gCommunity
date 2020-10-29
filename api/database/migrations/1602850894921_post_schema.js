/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PostSchema extends Schema {
  up() {
    this.create('posts', (table) => {
      table.increments();
      table.string('title').notNullable();
      table.text('description').notNullable();
      table.string('tags').notNullable();
      table.string('game');
      table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('SET NULL');
      table.integer('file_id').unsigned().references('id').inTable('files').onUpdate('CASCADE').onDelete('SET NULL');
      table.integer('num_likes').defaultTo(0);
      table.integer('num_deslikes').defaultTo(0);
      table.integer('num_comments').defaultTo(0);
      table.timestamps();
    });
  }

  down() {
    this.drop('posts');
  }
}

module.exports = PostSchema;
