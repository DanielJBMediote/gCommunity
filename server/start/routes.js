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
const Route = use('Route');

Route.get('/', ({ response }) => response.send('Funcionando'));

/**
 * Rotas Publicas
 */
Route.group(() => {
  Route.post('/register', 'UserController.store');
  Route.post('/session', 'SessionController.store');

  Route.get('/posts', 'PostController.index');
  Route.post('/posts', 'PostController.listByTags');

  Route.resource('/file', 'FileController').apiOnly();
});

/**
 * Rotas para Moderador
 */
Route.group(() => {})
  .middleware(['auth'])
  .prefix('/admin');

/**
 * Rotoas para Usuarios
 */
Route.group(() => {
  Route.post('/password-reset', 'ForgotPasswordController.store');
  Route.get('data', 'UserController.getUserByID');
  // Route.resource('', 'UserController').apiOnly();
  Route.put('/update', 'UserController.update');
  Route.delete('/delete', 'UserController.destroy');
})
  .middleware(['auth'])
  .prefix('/user');

/**
 * Rotas para Postagens
 */
Route.group(() => {
  Route.get('user-posts', 'PostController.listByUserID');

  Route.resource('', 'PostController').apiOnly();
  Route.put('/:postID/like', 'PostController.like');
  Route.put('/:postID/dislike', 'PostController.dislike');

})
  .middleware(['auth'])
  .prefix('/post');

/**
 * Rotas para Comentários
 */
Route.group(() => {
  Route.resource('', 'CommentController').apiOnly();

  Route.put('/:commentID/like', 'CommentController.like');
  Route.put('/:commentID/deslike', 'CommentController.deslike');
})
  .middleware(['auth'])
  .prefix('/comment/:postID');
