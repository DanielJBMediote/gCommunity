'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Comment extends Model {

    /**
     * Cada Comentário pertence a UM Usuario
     */
    user() {
        return this.belongsTo('App/Models/User')
    }

    /**
     * Cada comentário pertenca a UMa Pastagem
     */
    post() {
        return this.belongsTo('App/Models/Post')
    }

}

module.exports = Comment
