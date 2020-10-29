'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Auth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response, auth }, next) {
    try {
      await auth.check()
    } catch (error) {
      return response.status(error.status).send({ message: 'Vocẽ não está logado' })
    }

    await next()
  }
}

module.exports = Auth
