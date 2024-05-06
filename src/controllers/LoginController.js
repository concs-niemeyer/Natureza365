const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

class LoginController {
  async login(req, res) {
    try {
      const email = req.body.email;
      const senha = req.body.senha;

      if (!email) {
        return res.status(400).json({ error: "O email é obrigatório" });
      }

      if (!senha) {
        return res.status(400).json({ error: "O password é obrigatório" });
      }

      const usuario = await Usuario.findOne({ where: { email } });

      if (!usuario) {
        return res
          .status(404)
          .json({
            error: "Nenhum aluno corresponde a email e senha fornecido.",
          });
      }

      const hashSenha = await compare(senha, usuario.senha);

      if (hashSenha === false) {
        return res.status(400).json({ mensagem: "Não encontrado essa conta" });
      }
      const payload = {
        sub: usuario.id,
        email: usuario.email,
        nome: usuario.nome,
      };

      const token = sign(payload, process.env.SECRET_JWT);

      res.status(200).json({ Token: token });
    } catch (error) {
      return res.status(500).json({ error: error, errorm: "Algo deu errado!" });
    }
  }
}

module.exports = new LoginController();
