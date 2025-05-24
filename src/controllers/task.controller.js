const { Task, Comment, Tag } = require("../models");
const mailer = require("../services/mailer.service");

exports.create = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    projectId: req.params.projectId,
  });
  res.status(201).json(task);
};

exports.update = async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  await task.update(req.body);
  res.json(task);
};

exports.comment = async (req, res) => {
  const comment = await Comment.create({
    text: req.body.text,
    taskId: req.params.id,
    authorId: req.user.id,
  });
  res.status(201).json(comment);
};

exports.tag = async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  const [tag] = await Tag.findOrCreate({ where: { name: req.body.name } });
  await task.addTag(tag);
  res.json(await task.getTags());
};

// Example reminder (to be scheduled via cron/CI): find overdue tasks & email assignees
exports.sendReminders = async () => {
  const overdue = await Task.findAll({
    where: { status: "todo", dueDate: { $lt: new Date() } },
    include: ["assignee"],
  });
  for (const t of overdue) {
    await mailer.send({
      to: t.assignee.email,
      subject: `Task overdue: ${t.title}`,
      text: `Your task "${t.title}" was due ${t.dueDate.toDateString()}.`,
    });
  }
};
