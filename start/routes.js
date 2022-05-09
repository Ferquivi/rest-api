'use strict'

const ProyectoController = require('../app/Controllers/Http/ProyectoController');
const UserController = require('../app/Controllers/Http/UserController')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('usuarios/registro', 'UserController.store');
  Route.post('usuarios/login', 'UserController.login');
  Route.get('proyectos', 'ProyectoController.index').middleware('auth');
  Route.get('proyectos', 'ProyectoController.create').middleware('auth');
  Route.delete('proyectos/:id', 'ProyctoController.destroy').middleware('auth');
}).prefix('api/v1/');


