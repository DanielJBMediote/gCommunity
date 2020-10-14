"use strict";

const User = use('App/Models/User')

class UserController {
  /**
   * Create/save a new file.
   * POST files
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(["username", "email", "password"])

    // Default Values when created
    data.active_status = true;
    data.provider = false;

    try {
      const user = await User.create(data);

      return response.status(200).send({ message: "Success", data: user })
    } catch (err) {
      const errResult = (err.code == 23505) ? "Email ou Usuário já Existente" : "Algo deu Errado"
      return response.status(400).send({ message: "error", error: errResult })
    }
  }
}

module.exports = UserController;
