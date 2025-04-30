const { compare } = require("bcrypt"); // Certifique-se de que bcrypt está instalado
const { sign } = require("jsonwebtoken");
const User = require("../models/User");
const verifyCaptcha = require("../middleware/verifyCaptcha");

class LoginController {
  async login(req, res) {
    try {
      const { email, password, captchaValue } = req.body;

      // Verificação do CAPTCHA
      const isHuman = await verifyCaptcha(captchaValue);
      if (!isHuman) {
        return res
          .status(400)
          .send({ message: "Falha na verificação do reCAPTCHA" });
      }

      if (!email) {
        return res.status(400).json({ error: "O email é obrigatório" });
      }

      if (!password) {
        return res.status(400).json({ error: "A senha é obrigatória" });
      }

      const user = await User.findOne({
        where: { email },
        include: ["roles"],
      });
      console.log(":::USER:::")
      console.log(user)
      if (!user) {
        return res.status(404).json({
          error: "Nenhum usuário corresponde ao email fornecido.",
        });
      }

      // Comparar a senha fornecida com a senha armazenada
      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400).json({ error: "Email ou senha incorretos." });
      }

      const payload = {
        sub: user.id,
        email: user.email,
        name: user.name,
        roles: user.roles.map((role) => ({
          id: role.id,
          description: role.description,
        })),
      };

      // console.log("<<>PAYLOAD_SIGN_IN>>>")
      // console.log(payload);
      
      const token = sign(payload, process.env.SECRET_JWT, { expiresIn: "1h" }); // Token válido por 1h
      
      console.log(":::TOKEN_SIGN_IN:::")
      console.log(token)
      res.status(200).json({ token });
    } catch (error) {
      console.error(error); // log para ver erros no console
      return res.status(500).json({ error: "Algo deu errado!" });
    }
  }
}

module.exports = new LoginController();
