const sequelize = require("../config/database");
const User = require("./user.model");
const Project = require("./project.model");
const Task = require("./task.model");
const Comment = require("./comment.model");
const Tag = require("./tag.model");

module.exports = { sequelize, User, Project, Task, Comment, Tag };
