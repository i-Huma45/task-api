const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Project = require("./project.model");
const User = require("./user.model");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM("todo", "in-progress", "done"),
    defaultValue: "todo",
  },
  dueDate: DataTypes.DATE,
});

Task.belongsTo(Project, { foreignKey: "projectId" });
Project.hasMany(Task, { foreignKey: "projectId" });

Task.belongsTo(User, { as: "assignee", foreignKey: "assigneeId" });
User.hasMany(Task, { foreignKey: "assigneeId" });

module.exports = Task;
