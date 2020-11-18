const CommentModel = use('App/Models/Comment');

class CommentRepository {

  async findOrFail(id) {
    return await CommentModel.findOrFail(id);
  }

  async insert(data) {
    return await CommentModel.create(data);
  }

  async delete(comment) {
    return await comment.delete();
  }

  async update(comment) {
    return await comment.save();
  }

  async listAll() {
    return await CommentModel.query().with('posts', 'user').fetch();
  }

  async listByPostID(postID) {
    return await CommentModel.query()
      .where('post_id', postID)
      .orderBy('id', 'desc')
      .with('user')
      .fetch();
  }
}

module.exports = CommentRepository;
