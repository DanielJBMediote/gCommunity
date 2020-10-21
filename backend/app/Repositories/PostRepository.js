
const PostModel = use('App/Models/Post');

class PostRepository {

  async listByGame (type) {
    return await PostModel.findByOrFail('game', type);
  }

  async getByUserId (userId) {
    return await PostModel.findByOrFail('user_id', userId);
  }

  async getById (id) {
    return await PostModel.findOrFail(id);
  }

  async listAll () {
    return await PostModel.query().with('user').fetch();
  }

  async insert (data) {
    return await PostModel.create(data);
  }

  async delete (data) {
    return await data.delete();
  }

  async update (data) {
    return await data.save();
  }
}

module.exports = PostRepository;
