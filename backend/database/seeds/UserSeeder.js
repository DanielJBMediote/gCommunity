'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Database = use('Database')

class UserSeeder {
  async run() {
    await Database.table('users').where('provider', true).delete()

    await Database.table('users').insert([
      {
        username: 'admin',
        email: 'admin@gcommunity.com',
        password: '$2a$10$C3jy9fh2/yn3ApvyUeWwTeIfqq/lYKDt.WuzD5Ocjpxq4Z8Q1Twna',
        provider: true,
        active_status: true
      }
    ])
  }
}

module.exports = UserSeeder
