const fetch = require("node-fetch");

const verifyCaptcha = async (req, res, next) => {
  const { captchaValue } = req.body;
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!captchaValue) {
    return res.status(400).json({ message: "Captcha não fornecido." });
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secret}&response=${captchaValue}`,
    });

    const data = await response.json();

    if (!data.success) {
      return res.status(400).json({ message: "Falha na verificação do captcha." });
    }

    // Passou no captcha, segue o fluxo
    next();
  } catch (error) {
    console.error("Erro ao verificar captcha:", error);
    return res.status(500).json({ message: "Erro interno na verificação do captcha." });
  }
};

module.exports = verifyCaptcha;
