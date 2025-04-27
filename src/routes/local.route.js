const { Router } = require("express");
const { auth } = require("../middleware/auth");
const LocalController = require("../controllers/LocalController");
const validarLocal = require("../middleware/validateLocal");
const localSchema = require("../schemas/localSchema");

const localRoutes = Router();

// Middleware de autenticação aplicado globalmente (se quiser para todos)
localRoutes.use(auth);

// Cadastrar novo Local da Natureza
localRoutes.post(
  "/",
  validarLocal(localSchema),
  /*
    #swagger.tags = ['Local da Natureza']
    #swagger.description = 'Adiciona um novo local da natureza'
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        $name: "Nome do local",
        $address: "Rua, complemento, bairro",  
        desc_flora: "Tem flores silvestres",
        desc_fauna: "Não tem cachorro do mato",
      }
    }
  */
  LocalController.cadastrar
);

// Listar todos Locais da Natureza do usuário
localRoutes.get("/", LocalController.listar);

// Atualizar informações de um Local da Natureza
localRoutes.put(
  "/:local_id",
  /*
    #swagger.tags = ['Local da Natureza']
    #swagger.description = 'Atualiza informações do local da natureza'
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        $name: "Novo nome do local",
        $address: "Novo endereço do local",
        desc_flora: "Nova descrição da flora",
        desc_fauna: "Nova descrição da fauna",
      }
    }
  */
  LocalController.atualizar
);

// Deletar um Local da Natureza
localRoutes.delete("/:local_id", LocalController.deletar);

// Gerar link para Google Maps de um Local
localRoutes.get("/:local_id/maps", LocalController.mapear);

module.exports = localRoutes;
