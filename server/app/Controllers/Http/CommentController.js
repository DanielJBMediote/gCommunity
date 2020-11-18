/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const CommentService = use('App/Services/CommentService');

/**
 * Resourceful controller for interacting with comments
 */
class CommentController {

  constructor(commentService = new CommentService()) {
    this.commentService = commentService;
  }

  /**
   * This one will list all comments by post_id
   * @param {object} context
   */
  async getAllCommentariesByPost(context) {
    return await this.commentService.listByPostID(context);
  }

  async store(context) {
    return await this.commentService.insertComment(context);
  }

  async update(context) {
    return await this.commentService.updateComment(context);
  }

  async destroy(context) {
    return await this.commentService.deleteComment(context);
  }

  async like(context) {
    return await this.commentService.like(context);
  }

  async dislike(context) {
    return await this.commentService.dislike(context);
  }
}

module.exports = CommentController;
