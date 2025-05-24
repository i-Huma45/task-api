const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user.model");

const Project = sequelize.define("Project", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
});

Project.belongsTo(User, { as: "owner", foreignKey: "ownerId" });
User.hasMany(Project, { foreignKey: "ownerId" });

module.exports = Project;
