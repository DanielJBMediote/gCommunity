const CommentRepository = use('App/Repositories/CommentRepository');
const PostService = use('App/Services/PostService');

class CommentService {
  constructor(commentRepository = new CommentRepository(), postService = new PostService()) {
    this.commentRepository = commentRepository;
    this.postService = postService;
  }

  async listByPostID({ response, params }) {
    return response.send(await this.commentRepository.listByPostID(params.id));
  }

  async listAll({ response }) {
    return response.send(await this.commentRepository.listAll());
  }

  async deleteComment({ response, params, auth }) {
    try {
      const comment = await this.commentRepository.findOrFail(params.id);
      if (!auth.user.id == comment.user_id) {
        return response.status(401).send({ msg: 'Você não pode deletar este comentário' });
      }
      await this.commentRepository.delete(comment);
      return response.status(200).send({ msg: 'Comentário deletado' });
    } catch (error) {
      return response.status(error.status).send({ msg: 'Erro ao deletar o comentário' });
    }
  }

  async updateComment({
    request, response, params, auth,
  }) {
    const data = request.all();
    try {
      const comment = await this.commentRepository.findOrFail(params.id);
      if (comment.user_id != auth.user.id) {
        return response.status(401).send({ msg: 'Você não pode alterar este comentário' });
      }
      comment.description = data.description;
      await this.commentRepository.update(comment);
      return response.status(200).send({ msg: 'Comentário foi alterado' });
    } catch (error) {
      return response.status(error.status).send({ msg: 'Erro ao alterar este comentário' });
    }
  }

  async insertComment({
    request, response, params, auth,
  }) {
    const data = request.all();
    data.post_id = Number(params.postID);
    data.user_id = auth.user.id;

    await this.postService.updatePostComment({ params });
    return response.send(await this.commentRepository.insert(data));
  }

  async like({ response, params }) {
    const comment = await this.commentRepository.findOrFail(params.id);
    comment.num_likes += 1;
    await this.commentRepository.update(comment);
    return response.send(comment);
  }

  async dislike({ response, params }) {
    const comment = await this.commentRepository.findOrFail(params.id);
    comment.num_deslikes += 1;
    await this.commentRepository.update(comment);
    return response.send(comment);
  }
}

module.exports = CommentService;
