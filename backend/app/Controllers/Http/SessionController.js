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
        const { username, password } = request.all();

        const token = auth.attempt(username, password);

        return token;
    }
}

module.exports = SessionController;
