const nodemailer = require("nodemailer");
const inlineBase64 = require("nodemailer-plugin-inline-base64");
const fs = require("fs");
const { promisify } = require("util");
// const path = require("path");
const config = require("../config");
const logger = require("../config/logger");

const readFile = promisify(fs.readFile);
const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== "local") {
  transport
    .verify()
    .then(() => logger.info("Connected to email server"))
    .catch(() =>
      logger.warn(
        "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
      )
    );
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text, html) => {
  transport.use("compile", inlineBase64());
  const msg = { from: config.email.from, to, subject, text, html };
  try {
    await transport.sendMail(msg);
  } catch (e) {
    console.log(e);
    logger.error(e);
  }
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = "Reset password";
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
  const text = `Dear user,
  To reset your password, click on this link: ${resetPasswordUrl}
  If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

module.exports = {
  sendEmail,
  sendResetPasswordEmail,
};
