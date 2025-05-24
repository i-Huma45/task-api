// src/server.js
require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./models");

const port = process.env.PORT || 4000;

(async () => {
  // In test mode we force-sync (fresh schema). Otherwise use alter.
  const syncOpts =
    process.env.NODE_ENV === "test" ? { force: true } : { alter: true };

  await sequelize.sync(syncOpts);
  app.listen(port, () => {
    console.log(`🚀 Server is up on http://localhost:${port}`);
  });
})();
