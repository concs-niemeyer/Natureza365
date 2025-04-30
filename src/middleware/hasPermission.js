const { verify } = require('jsonwebtoken');
const Permission = require("../models/Permission");
const PermissionRole = require("../models/PermissionRole");

function hasPermission(permissions) {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Verifica se o cabeçalho Authorization existe e começa com "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ message: "Token mal formatado ou ausente" });
    }

    // Extrair o token removendo "Bearer " da string
    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = verify(token, process.env.SECRET_JWT);
      req.payload = decoded;
      console.log(":::PAYLOAD:::", decoded);
    } catch (err) {
      return res.status(401).send({ message: "Token inválido", cause: err.message });
    }

    try {
      const roles = await PermissionRole.findAll({
        where: {
          roleId: req.payload.roles.map((role) => role.id),
        },
        attributes: ["permissionId"],
        include: [{ model: Permission, as: "permissions" }],
      });

      console.log(":::ROLES :::");
      console.log(roles);

      // Verifica se pelo menos uma das permissões requisitadas está presente
      const existPermission = roles.some((role) => {
        return role.permissions.some((p) => {
          console.log(":::PERMISSÕES:::", p.description);
          return permissions.includes(p.description);
        });
      });

      console.log(":::EXISTE A PERMISSÃO:::");
      console.log(existPermission);

      if (!existPermission) {
        return res.status(403).send({
          message: "Você não tem autorização para este recurso.",
        });
      }

      next();
    } catch (error) {
      console.log(error);
      return res.status(401).send({
        message: "Autenticação Falhou",
        cause: error.message,
      });
    }
  };
}

module.exports = { hasPermission };
