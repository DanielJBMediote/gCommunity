/* eslint-disable no-empty-function */

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const PostService = use('App/Services/PostService');
/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  constructor(postService = new PostService()) {
    this.postService = postService;
  }

  async getByTags(context) {
    return this.postService.listByTags(context);
  }

  async getByUserID(context) {
    return this.postService.listByUserID(context);
  }

  async show(context) {
    return this.postService.getByID(context);
  }

  async index(context) {
    return await this.postService.listAll(context);
  }

  async store(context) {
    return await this.postService.createPost(context);
  }

  async update(context) {
    return await this.postService.updatePost(context);
  }

  async destroy(context) {
    return await this.postService.deletePost(context);
  }

  async like(context) {
    return await this.postService.like(context);
  }

  async dislike(context) {
    return await this.postService.dislike(context);
  }
}

module.exports = PostController;
