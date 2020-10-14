"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FileSchema extends Schema {
  up() {
    this.create("files", (table) => {
      table.increments();
      table.string("file", 100).notNullable();
      table.string("name", 100).notNullable();
      table.string("type", 20).notNullable();
      table.string("subtype", 20).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("files");
  }
}

module.exports = FileSchema;
