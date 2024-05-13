const { Router } = require('express')

const UsuarioController = require('../controllers/UsuarioController')
const validate = require('../middleware/validation')
const usuarioSchema = require('../schemas/userSchema')

const usuarioRoutes = new Router()

usuarioRoutes.post('/', validate(usuarioSchema), UsuarioController.cadastrar)

// Rota atualizar usuário

//Rota deletar usuário

module.exports = usuarioRoutes