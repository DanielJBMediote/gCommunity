

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const CommentService = use('App/Services/CommentService');

/**
 * Resourceful controller for interacting with comments
 */
class CommentController {

  constructor (commentService = new CommentService()) {
    this.commentService = commentService;
  }

  /**
   * This one will list all comments by post_id
   * @param {object} context
   */
  async index (context) {
    return await this.commentService.listByPostId(context);
  }

  async store (context) {
    return await this.commentService.insertComment(context);
  }

  async update (context) {
    return await this.commentService.updateComment(context);
  }

  async destroy (context) {
    return await this.commentService.deleteComment(context);
  }

  async like (context) {
    return await this.commentService.like(context);
  }

  async deslike (context) {
    return await this.commentService.deslike(context);
  }
}

module.exports = CommentController;
