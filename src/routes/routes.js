const { Router } = require('express')
const loginRoutes = require("./login.route");
const usuarioRoutes = require('./usuario.route');
const localRoutes = require('./local.route');

const routes = new Router()

routes.use('/login', loginRoutes)
routes.use('/usuario', usuarioRoutes)
routes.use('/local', localRoutes)

module.exports = routes
