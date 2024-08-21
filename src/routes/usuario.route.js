const { Router } = require('express')

const UsuarioController = require('../controllers/UsuarioController')
const usuarioSchema = require('../schemas/userSchema')
const validarUsuario = require('../middleware/validateUser')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./doc.swagger.json');


const usuarioRoutes = new Router()

usuarioRoutes.post(
    '/',
    validarUsuario(usuarioSchema),
      /*  
            #swagger.tags = ['Usuário'],
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Adiciona um novo Usuário',
                schema: {
                  $nome: "Nome completo",
                  sexo: "feminino, masculino ou outros",
                  $cpf: "10987654321",  
                  $email: "teste@gmail.com",
                  $senha: "123",
                  data_nascimento: "1996-12-15",
            }
        }
    */
    UsuarioController.cadastrar
)

// Necessários ajustes na função validarUsuario do middleware (cpf)
usuarioRoutes.put(
    '/:usuarioId',
        /*
            #swagger.tags = ['Usuário],
            #swagger.parameters['usuarioId'] = {
                in: 'body',
                schema: {
                    $nome: "Nome completo",
                    sexo: "feminino, masculino ou outros",
                    $cpf: "10987654321",  
                    $email: "teste@gmail.com",
                    $senha: "123",
                    data_nascimento: "1996-12-15",
                }
            }
        */

  //  validarUsuario(usuarioSchema),

    UsuarioController.atualizar
)

usuarioRoutes.get('/', swaggerUi.setup(swaggerDocument))

//Rota para deletar conta ...

module.exports = usuarioRoutes