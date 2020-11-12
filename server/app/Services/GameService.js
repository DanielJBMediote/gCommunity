const GameRepository = use('App/Repositories/GameRepository');

class GameService {
  constructor(gameRepository = new GameRepository()) {
    this.gameRepository = gameRepository;
  }

  async listAllGames({ response }) {
    return response.status(200).send(await this.gameRepository.listAll());
  }
}

module.exports = GameService;
