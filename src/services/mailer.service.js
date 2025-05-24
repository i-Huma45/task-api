const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});
exports.send = (opts) =>
  transporter.sendMail({
    from: process.env.EMAIL_USER,
    ...opts,
  });
