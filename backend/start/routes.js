"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get('/', ({ response }) => { return response.send('Funcioanndo') })

/**
 * Rotas Publicas
 */
Route.group(() => {
  Route.post('/register', 'UserController.store')
  Route.post('/session', 'SessionController.store')

  Route.post('/file', 'FileController.store')
  Route.get('/file/:id', 'FileController.show')
});

/**
 * Rotas para Moderador
 */
Route.group(() => {

}).middleware(['auth']).prefix('/admin')

/**
 * Rotoas para Usuarios
 */
Route.group(() => {
  Route.post('/password-reset', 'ForgotPasswordController.store')
  Route.put('/update', 'UserController.update')
  Route.delete('/delete', 'UserController.destroy')

  Route.resource('/post', 'PostController').apiOnly()
  Route.resource('/comment', 'CommentController').apiOnly()
}).middleware(['auth']).prefix('/user')

/**
 * Rotas para Postagens
 */
Route.group(() => {

}).middleware().prefix('post')


/**
 * Rotas para Comentários
 */
Route.group(() => {

}).middleware().prefix('/comment')
