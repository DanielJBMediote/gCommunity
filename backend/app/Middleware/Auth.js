'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const jwt = require('jsonwebtoken')
const { promisify } = require('util');
const auth = require('../../config/auth');

const authConfig = require('../../config/auth')

class Auth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response }, next) {
    const authHeader = request.headers.authorization;

    // const [, token] = authHeader.split(' ')
    return response.send({ auth: authHeader })

    // try {
    //   const decoded = await promisify(jwt.verify)(token, auth.jwt)

    //   response.decoded = decoded
    // } catch (err) {
    //   return response.status(404).send({ message: err })
    // }

    await next()
  }
}

module.exports = Auth
