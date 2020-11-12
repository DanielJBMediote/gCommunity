/*
|--------------------------------------------------------------------------
| PostSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Database = use('Database');

class PostsSeeder {
  async run() {
    await Database.table('posts').delete();

    await Database.table('posts').insert([
      {
        title: 'Postagem 01',
        game: 'Counter Strike: Global Ofensive',
        tags: 'dicas, truques',
        description: 'Sed ut perspiciatis unde omnis '
        + 'iste natus error sit voluptatem accusantium '
        + 'doloremque laudantium, totam rem aperiam, eaque '
        + 'ipsa quae ab illo inventore veritatis et quasi '
        + 'architecto beatae vitae dicta sunt explicabo.',
        user_id: 2,
      },
      {
        title: 'Postagem 02',
        game: 'GTA V',
        tags: 'falhas, bugs',
        description: 'Sed ut perspiciatis unde omnis '
        + 'iste natus error sit voluptatem accusantium '
        + 'doloremque laudantium, totam rem aperiam, eaque '
        + 'ipsa quae ab illo inventore veritatis et quasi '
        + 'architecto beatae vitae dicta sunt explicabo.',
        user_id: 3,
      },
    ]);
  }
}

module.exports = PostsSeeder;
