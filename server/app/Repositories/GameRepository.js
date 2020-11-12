const GameModel = use('App/Models/Game');

class GameRepository {
  async listAll() {
    return await GameModel.all();
  }
}

module.exports = GameRepository;
