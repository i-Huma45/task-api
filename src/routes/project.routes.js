const r = require("express").Router();
const c = require("../controllers/project.controller");
const auth = require("../middleware/authenticate");
r.use(auth);
r.post("/", c.create);
r.get("/", c.list);
module.exports = r;
