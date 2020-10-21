

const UserService = use('App/Services/UserService');

class UserController {
  constructor (userService = new UserService()) {
    this.userService = userService;
  }

  async store (context) {
    return await this.userService.insertUser(context);
  }

  async update (context) {
    return await this.userService.updateUser(context);
  }

  async destroy (context) {
    return await this.userService.deleteUser(context);
  }
}

module.exports = UserController;
