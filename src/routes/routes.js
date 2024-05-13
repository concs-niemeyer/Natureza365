const { Router } = require('express')
const loginRoutes = require("./login.route");
const usuarioRoutes = require('./usuario.route');
const localRoutes = require('./local.route');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./doc.swagger.json');

const routes = new Router()

routes.use('/login', loginRoutes)
routes.use('/usuario', usuarioRoutes)
routes.use('/local', localRoutes)
routes.use('/docs', swaggerUi.serve,swaggerUi.setup(swaggerDocument))

module.exports = routes
