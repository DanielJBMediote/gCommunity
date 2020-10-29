
const CommentModel = use('App/Models/Comment');

class CommentRepository {


  async getById(id) {
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

  async listByPostId(post_id) {
    return await CommentModel.query().where('post_id', post_id).with('post').with('user')
      .fetch();
  }
}

module.exports = CommentRepository;
