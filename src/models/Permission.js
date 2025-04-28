const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");
const Role = require("./Role");
const PermissionRole = require("./PermissionRole");
const User = require("./User");
const UserRole = require("./UserRole");

const Permission = connection.define("permissions", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Mudança para usar o Sequelize para gerar a data de criação
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
});

// Relacionamento de muitos para muitos entre Role e Permission
Role.belongsToMany(Permission, { through: PermissionRole });
Permission.belongsToMany(Role, { through: PermissionRole });

// Relacionamento de muitos para muitos entre User e Role
User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

module.exports = Permission;
