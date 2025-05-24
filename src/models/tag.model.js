const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Task = require("./task.model");

const Tag = sequelize.define("Tag", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

// Many-to-many between Task ↔ Tag
Task.belongsToMany(Tag, { through: "TaskTags", foreignKey: "taskId" });
Tag.belongsToMany(Task, { through: "TaskTags", foreignKey: "tagId" });

module.exports = Tag;
