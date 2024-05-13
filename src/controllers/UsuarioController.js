const Usuario = require("../models/Usuario");
const yup = require('yup')

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

  async listar(req, res) {

    try {
      const usuarios = await Usuario.findAll();

      res.json(usuarios);

    } catch (error) {
      res.status(500).json({ error: "Erro ao obter usuarios." });
    }
  }

  async listarUm(req, res) {

    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado!" });
      }

      res.json(usuario);

    } catch (error) {
      console.log(error.error);
      res.status(500).json({
        error: "Não foi possível listar o aluno especifico",
        error: error,
      });
    }
  }
}

module.exports = new UsuarioController();
