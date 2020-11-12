const underscore = require('underscore');

// const Env = use('Env');

const PostRepository = use('App/Repositories/PostRepository');
const UserRepository = use('App/Repositories/UserRepository');
const FileService = use('App/Services/FileService');

class PostService {
  constructor(
    postRepository = new PostRepository(),
    fileService = new FileService(),
    userRepository = new UserRepository(),
  ) {
    this.postRepository = postRepository;
    this.fileService = fileService;
    this.userRepository = userRepository;
  }

  async listAll({ response }) {
    const posts = await this.postRepository.listAll();

    return response.send(posts);
  }

  async getByID({ params, response }) {
    return await this.postRepository.getByID(params.id);
  }

  async listByTags({ request, response }) {
    const { tags } = request.all();

    const tagList = tags.split(', ');
    try {
      const posts = await this.postRepository.listAll();

      const postsTags = [];
      posts.map(post => {
        const found = underscore.intersection(tagList, post.tags.split(', '));
        if (found.length != 0) {
          postsTags.push(post);
        }
      });

      return response.send(posts);
    } catch (err) {
      return response
        .status(err.status)
        .send({
          msg: 'Erro ao buscar as Tags',
          error: 'Deu erro bem aqui e não sei',
        });
    }
  }

  async listByUserID({ response, auth }) {
    try {
      const posts = await this.postRepository.getByUserID(auth.user.id);

      posts.map(post => {

        if (post.file_id) {
          post.file_url = `http://localhost:3333/file/${post.file_id}`;
        } else {
          post.file_url = 'https://icoconvert.com/images/noimage2.png';
        }
        delete post.file_id;
      });

      return response.status(200).send(posts);

    } catch (err) {
      response.status(err.status).send({ msg: 'Erro ao buscar a Postagem', error: err });
    }
  }

  async createPost({ request, response, auth }) {
    const data = request.all();
    // return response.send(data);
    try {
      data.user_id = auth.user.id;

      const file = await this.fileService.updateFileByID({ request });
      if (file) data.file_id = file.id;

      const post = await this.postRepository.insert(data);
      return response.status(200).send({ msg: 'sucesso', post });
    } catch (err) {
      response.status(err.status).send({ msg: 'Erro criar a Postagem' });
    }
  }

  /**
   * Atualizar a Postagem, usando o ID da Postagem (id)
   * e o ID do Usuário (user_id)
   */
  async updatePost({
    request, response, auth, params,
  }) {
    const data = request.all();
    try {
      const post = await this.postRepository.getByID(params.id);

      if (!post || post.user_id != auth.user.id) {
        return response
          .status(401)
          .send({
            msg: 'Você precisa estar na sua conta para alterar essa postagem',
          });
      }

      const file = await this.fileService.updateFileByID({
        request,
        response,
        fileID: post.file_id,
      });
      if (file) post.file_id = file.id;

      post.title = data.title;
      post.description = data.description;
      post.tags = data.tags;
      post.game = data.game;

      await this.postRepository.update(post);

      return response
        .status(200)
        .send(post);
    } catch (error) {
      return response.status(error.status).send(error);
    }
  }

  async updatePostComment({ params }) {
    const post = await this.postRepository.getByID(params.postID);
    post.num_comments += 1;
    await this.postRepository.update(post);
  }

  /**
   * Deleta uma Postagem baseado no ID da Postagem
   */
  async deletePost({ response, params, auth }) {
    const post = await this.postRepository.getByID(params.id);
    try {
      // Verificar se o Usuário Logado é autor da Postagem
      if (post.user_id != auth.user.id) {
        return response
          .status(401)
          .send({ msg: 'Você não pode apagar esta postagem' });
      }

      // Verificar se a Postagem tem algum arquivo e deleta-lo
      if (post.file_id) {
        await this.fileService.deleteFileFromPath({
          params: { id: post.file_id },
        });
      }
      await this.postRepository.delete(post);

      return response.status(200).send({ msg: 'A Postagem foi Deletada' });
    } catch (error) {
      return response
        .status(error.status)
        .send({ msg: 'Erro ao deletar a postagem' });
    }
  }

  async like({ response, params }) {
    const post = await this.postRepository.getByID(params.postID);
    post.num_likes += 1;
    await this.postRepository.update(post);
    return response.send(post);
  }

  async dislike({ response, params }) {
    const post = await this.postRepository.getByID(params.postID);
    post.num_deslikes += 1;
    await this.postRepository.update(post);
    return response.send(post);
  }
}

module.exports = PostService;
