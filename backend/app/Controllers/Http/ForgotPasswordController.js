

const crypto = require('crypto');

const User = use('App/Models/User');

class ForgotPasswordController {
  /**
     *
     * @param {object} ctx
     */
  async store ({ request, response }) {
    try {
      const email = request.input('email');
      const user = await User.findByOrFail('email', email);

      user.token = crypto.randomBytes(8).toString('hex');
      user.token_created_at = new Date();

      await user.save();
    } catch (err) {
      return response.status(err.status).send({ error: { message: 'Erro ao enviar o E-mail' } });
    }
  }
}

module.exports = ForgotPasswordController;
