const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Task = require("./task.model");
const User = require("./user.model");

const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  text: { type: DataTypes.TEXT, allowNull: false },
});

Comment.belongsTo(Task, { foreignKey: "taskId" });
Task.hasMany(Comment, { foreignKey: "taskId" });

Comment.belongsTo(User, { as: "author", foreignKey: "authorId" });
User.hasMany(Comment, { foreignKey: "authorId" });

module.exports = Comment;
