const { validate } = use('Validator');
const UserRepository = use('App/Repositories/UserRepository');
const FileService = use('App/Services/FileService');

class UserService {
  constructor(
    userRepository = new UserRepository(),
    fileService = new FileService(),
  ) {
    this.userRepository = userRepository;
    this.fileService = fileService;

    this.rules = {
      email: 'required',
      username: 'required',
      password: 'required',
    };
  }

  async indexUserByID({ response, auth }) {
    const user = await this.userRepository.getByID(auth.user.id);
    return response.status(200).send(user);
  }

  async insertUser({ request, response }) {
    const data = request.only(['username', 'email', 'password']);

    if (!(await validate(data, this.rules))) {
      return response
        .status(400)
        .send({ message: 'Alguns campos requer atenção' });
    }
    try {
      const user = await this.userRepository.insert(data);
      return response.status(200).send({ message: 'Success', data: user });
    } catch (err) {
      return response.status(400).send({
        message: 'error',
        error:
          err.code == 23505
            ? 'Email ou Usuário já Existente'
            : 'Algo deu Errado',
      });
    }
  }

  async updateUser({ request, response, auth }) {
    const data = request.all();
    try {
      const user = await this.userRepository.getByID(auth.user.id);
      if (!user) {
        return response
          .status(401)
          .send({ msg: 'Você precisa estar na sua conta para altear' });
      }

      /** Deletar o arquivo antigo e Inserir o novo */
      const file = await this.fileService.updateFileByID(
        { request, response, fileID: user.avatar_id },
      );
      if (file) {
        user.avatar_id = file.id;
        // data.avatar_id = file.id;
      }
      user.fullname = data.fullname;
      user.password = data.password;
      user.age = data.age;
      if (user.email == data.email) {
        delete user.email;
      }
      await this.userRepository.update(user);
      return response
        .status(200)
        .send(user);

    } catch (err) {
      return response
        .status(err.status)
        .send({ message: 'Ops, algo deu errado' });
    }
  }

  async deleteUser({ response, auth }) {
    await this.userRepository.delete(await this.userRepository.getByID(auth.user.id));
    return response.status(200).send({
      msg: 'Usuario foi deletado, voce será redirecionado par tela de login',
    });
  }
}

module.exports = UserService;
