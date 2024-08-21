const Usuario = require("../models/Usuario");
const { userId } = require("../middleware/userId");

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
      console.error(error, error);
      res.status(500).json({ error: "Erro ao cadastrar usuário" });
    }
  }

  // realizar a busca do id pelo token.
  async atualizar(req, res) {
    // Chamada do middleware para verificar o token JWT
    userId(req, res, async () => {
      const usuarioId = req.params;
      console.log(usuarioId);
      const { nome, sexo, cpf, email, senha, data_nascimento } = req.body;

      try {
        await Usuario.update(
          {
            nome,
            sexo,
            cpf,
            email,
            senha,
            data_nascimento,
          },
          {
            where: {
              id: req.usuarioId,
            },
          }
        );

        res.status(200).json({
          nome,
          sexo,
          cpf,
          email,
          senha,
          data_nascimento,
        });
      } catch (error) {
        return res.status(500).json({ error: "Erro ao atualizar o usuário." });
      }
    });
  }
}

module.exports = new UsuarioController();
