const PostModel = use('App/Models/Post');
const Database = use('Database');

class PostRepository {

  async getByUserID(userId) {
    return await PostModel.query().where('user_id', userId).fetch();
  }

  async findOrFail(ID) {
    return await PostModel.findOrFail(ID);
  }

  async findByOrFail(byThis, iD) {
    return await PostModel.findByOrFail(byThis, iD);
  }

  async getByID(id) {
    return await PostModel.query().where('id', id).with('user').fetch();
  }

  async listAll() {
    return await PostModel
      .query()
      .with('user')
      .orderBy('id', 'desc')
      .fetch();
  }

  async getAll() {
    const posts = await Database
      .select('title', 'description', 'posts.updated_at',
        'tags', 'game', 'num_deslikes',
        'num_comments', 'num_likes', 'username', 'avatar_id')
      .from('posts')
      .innerJoin('users', 'posts.user_id', 'users.id');

    posts.map(post => {
      post.user = {
        username: post.username,
        avatar_id: post.avatar_id,
      };
      delete post.username; delete post.avatar_id;
    });

    return posts;
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

  async updateColumnFromQuery(id, numLikes) {
    return await PostModel.query().where('id', id).update({ num_likes: numLikes });
  }
}

module.exports = PostRepository;
