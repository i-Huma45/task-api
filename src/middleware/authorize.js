module.exports =
  (roles = []) =>
  (req, res, next) => {
    if (!roles.length || roles.includes(req.user.role)) return next();
    res.status(403).json({ message: "Forbidden" });
  };
