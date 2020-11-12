const PostModel = use('App/Models/Post');
const Database = use('Database');

class PostRepository {
  async getByUserID(userId) {
    return await Database.from('posts').where('user_id', userId);
  }

  async getByID(id) {
    return await PostModel.findOrFail(id);
  }

  async listAll() {
    return await PostModel
      .query()
      .with('user')
      .orderBy('id', 'desc')
      .fetch();
  }

  async insert(data) {
    return await PostModel.create(data);
  }

  async delete(data) {
    return await data.delete();
  }

  async update(data) {
    return await data.save();
  }
}

module.exports = PostRepository;
