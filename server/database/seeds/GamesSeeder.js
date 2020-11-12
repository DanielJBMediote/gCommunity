/*
|--------------------------------------------------------------------------
| GamerSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Database = use('Database');

class GamesSeeder {
  async run() {
    await Database.table('games').delete();

    await Database.table('games').insert([
      { name: 'The Elder Scrolls IV: Oblivion' },
      { name: 'The Elder Scrolls III: Morrowind' },
      { name: 'The Elder Scrolls V: Skyrim' },
      { name: 'GTA San Andreas' },
      { name: 'GTA Vici City' },
      { name: 'GTA IV' },
      { name: 'GTA V' },
      { name: 'Dark Souls' },
      { name: 'Dark Souls II' },
      { name: 'Dark Souls: Remastered' },
      { name: 'Minecraft Java Edition' },
      { name: 'Minecraft Microsoft Edition' },
      { name: 'Minecraft: Dungeons' },
      { name: 'Final Fantasy Series' },
      { name: 'Final Fantasy VII' },
      { name: 'Final Fantasy XII' },
      { name: 'Counter Strike: Global Ofensive' },
      { name: 'League of Legends' },
      { name: 'Genshin Impact' },
    ]);
  }
}

module.exports = GamesSeeder;
