"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", (table) => {
      table.increments();
      table.string("username", 80).notNullable().unique();
      table.string("email", 254).notNullable().unique();
      table.string("password", 60).notNullable();
      table.boolean("provider").notNullable();

      table.string('token')
      table.timestamp('token_created_at')

      table.string("avatar_url");
      table.string("fullname", 100)
      table.date("age")

      table.boolean("active_status").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
