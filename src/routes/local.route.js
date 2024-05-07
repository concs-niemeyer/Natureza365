const { Router } = require('express')
const { auth } = require('../middleware/auth')

const LocalController = require('../controllers/LocalController')

const localRoutes = new Router()

localRoutes.post('/', auth, LocalController.cadastrar)
localRoutes.get('/', auth, LocalController.listar)
localRoutes.put('/:local_id', auth, LocalController.atualizar)
localRoutes.delete('/:local_id', auth, LocalController.deletar)
localRoutes.get('/:local_id/maps', auth, LocalController.mapear)

module.exports = localRoutes