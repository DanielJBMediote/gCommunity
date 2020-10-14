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

/**
 * Rotas Publicas
 */
Route.group(() => {
  Route.post('/register', 'UserController.store')
  Route.post('/session', 'SessionController.store')
});

/**
 * Rotoas para Usuarios
 */
Route.group(() => {
  Route.post('/password-reset', 'ForgotPasswordController.store')

  // alterar dados

}).middleware(['auth']).prefix('/user')