const PostModel = use('App/Models/Post');
const Database = use('Database');

class PostRepository {

  async getByUserId(userId) {
    return await Database.from('posts').where('user_id', userId);
  }

  async getById(id) {
    return await PostModel.findOrFail(id);
  }

  async listAll() {
    const posts = await Database
      .table('posts')
      .innerJoin('users', 'users.id', 'posts.user_id')
      .distinct('posts.id', 'title', 'game', 'tags', 'description',
        'file_id', 'num_likes', 'num_deslikes', 'num_comments', 'posts.user_id',
        'username', 'avatar_id', 'posts.created_at').orderBy('posts.id', 'desc');

    let user = {};

    posts.map(post => {
      user = {
        id: post.user_id,
        username: post.username,
        avatar_id: post.avatar_id,
      };
      // eslint-disable-next-line no-unused-expressions
      delete post.user_id;
      delete post.username;
      delete post.avatar_id;
      post.user = user;
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
}

module.exports = PostRepository;
