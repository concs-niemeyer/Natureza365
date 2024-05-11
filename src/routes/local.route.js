const { Router } = require('express')
const { auth } = require('../middleware/auth')

const LocalController = require('../controllers/LocalController')
const validar= require('../middleware/validation')
const descricaoSchema = require('../schemas/descricaoSchema')
const localSchema = require('../schemas/localSchema')

const localRoutes = new Router()

localRoutes.post('/', auth, validar(localSchema) , LocalController.cadastrar)
localRoutes.get('/', auth, LocalController.listar)
localRoutes.put('/:local_id', auth, validar(descricaoSchema), LocalController.atualizar)
localRoutes.delete('/:local_id', auth ,LocalController.deletar)
localRoutes.get('/:local_id/maps', auth, LocalController.mapear)

module.exports = localRoutes