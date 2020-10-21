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

  async list({ response }) {
    return response.send(await this.postRepository.listAll());
  }

  async createPost({ request, response, auth }) {
    const data = request.all();
    try {
      data.user_id = auth.user.id;
      const file = await this.fileService.updateFileByID({ request });
      if (file) data.file_id = file.id;

      const post = await this.postRepository.insert(data);
      return response.status(200).send({ msg: 'sucesso', data: post });
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
      const post = await this.postRepository.getById(params.id);

      if (!post || post.user_id != auth.user.id) {
        return response
          .status(401)
          .send({ msg: 'Você precisa estar na sua conta para alterar essa postagem' });
      }

      const file = await this.fileService.updateFileByID({ request, response, fileID: post.file_id });
      if (file) post.file_id = file.id;

      post.title = data.title;
      post.description = data.description;
      post.category = data.category;
      post.game = data.game;

      await this.postRepository.update(post);
      return response.status(200).send({ msg: 'success', data: await this.postRepository.getById(params.id) });

    } catch (error) {
      return response.status(error.status).send(error);
    }
  }

  async updatePostComment({ params }) {
    const post = await this.postRepository.getById(params.postID);
    post.num_comments += 1;
    await this.postRepository.update(post);
  }

  /**
   * Deleta uma Postagem baseado no ID da Postagem
   */
  async deletePost({ response, params, auth }) {
    const post = await this.postRepository.getById(params.id);
    try {
      // Verificar se o Usuário Logado é autor da Postagem
      if (post.user_id != auth.user.id) {
        return response.status(401).send({ msg: 'Você não pode apagar esta postagem' });
      }

      // Verificar se a Postagem tem algum arquivo e deleta-lo
      if (post.file_id) {
        await this.fileService.deleteFileFromPath({ params: { id: post.file_id } });
      }
      await this.postRepository.delete(post);

      return response.status(200).send({ msg: 'A Postagem foi Deletada' });
    } catch (error) {
      return response.status(error.status).send({ msg: 'Erro ao deletar a postagem' });
    }
  }

  async like({ response, params }) {
    const post = await this.postRepository.getById(params.postID);
    post.num_likes += 1;
    await this.postRepository.update(post);
    return response.send(post);
  }

  async dislike({ response, params }) {
    const post = await this.postRepository.getById(params.postID);
    post.num_deslikes += 1;
    await this.postRepository.update(post);
    return response.send(post);
  }
}

module.exports = PostService;

