const Usuario = require("../models/Usuario");


class UsuarioController {

  async cadastrar(req, res) {
  
    const { nome, sexo, cpf, email, senha, data_nascimento } = req.body;

    try {
      const usuario = await Usuario.create({
        nome: nome,
        sexo: sexo,
        cpf: cpf,
        email: email,
        senha: senha,
        data_nascimento,
      });

      res.status(201).json(usuario);

    } catch (error) {
      console.error(error,error)
      res.status(500).json({ error: "Erro ao cadastrar usuário" });
    }
  }


  // realizar a busca do id pelo token.
  async atualizar(req, res) {
      // Chamada do middleware para verificar o token JWT
      userId(req, res, async () => {
        req.usuarioId = req.params
        const { nome, sexo, cpf, email, senha, data_nascimento } = req.body

        try {
          const usuarioExistente = await Usuario.update({
            nome,
            sexo,
            cpf,
            email,
            senha,
            data_nascimento
          }, {
              where: {
                id: req.usuarioId
              }
          })
    
          res.status(200).json({usuarioExistente})
        } catch (error) {
          return res.status(500).json({error: "Erro ao atualizar o usuário."})
        }
      })
    }
}

module.exports = new UsuarioController();
