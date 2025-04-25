const fetch = require("node-fetch");

async function verifyCaptcha(captchaValue) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `secret=${secret}&response=${captchaValue}`,
  });

  const data = await response.json();
  return data.success;
}

module.exports = verifyCaptcha;
