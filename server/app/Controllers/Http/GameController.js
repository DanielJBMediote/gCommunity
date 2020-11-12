/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const GameService = use('App/Services/GameService');

/**
 * Resourceful controller for interacting with games
 */
class GameController {

  constructor(gameService = new GameService()) {
    this.gameService = gameService;
  }

  /**
   * Show a list of all games.
   * GET games
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index(context) {
    return await this.gameService.listAllGames(context);
  }

}

module.exports = GameController;
