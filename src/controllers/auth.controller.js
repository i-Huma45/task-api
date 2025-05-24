const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hash });
  res.status(201).json({ id: user.id, email: user.email });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "Bad credentials" });
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "8h",
  });
  res.json({ token });
};
