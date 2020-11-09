"use strict";

class SessionController {

    /**
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {Auth} ctx.auth
     */
    async store({ request, response, auth }) {
        const { email, password } = request.all();

        const token = auth.attempt(email, password);

        return token;
    }
}

module.exports = SessionController;
