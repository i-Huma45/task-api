const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization?.split(" ")[1];
  if (!auth) return res.status(401).json({ message: "No token" });
  try {
    const { id } = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = await User.findByPk(id);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
