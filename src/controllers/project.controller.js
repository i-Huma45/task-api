const { Project } = require("../models");

exports.create = async (req, res) => {
  const project = await Project.create({ ...req.body, ownerId: req.user.id });
  res.status(201).json(project);
};

exports.list = async (req, res) => {
  const projects = await Project.findAll({ where: { ownerId: req.user.id } });
  res.json(projects);
};
