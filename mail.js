const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

const dotenv = require("dotenv");
dotenv.config();

const auth = {
  auth: {
    api_key: process.env.API_KEY,
    domain: process.env.DOMAIN,
  },
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (name, email, title, message, cb) => {
  const mailOptions = {
    sender: name,
    from: email,
    to: process.env.EMAIL,
    subject: title,
    text: message,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      cb(err, null);
      console.log(err);
    } else {
      cb(null, data);
      console.log(data);
    }
  });

};
// Exporting the sendmail
module.exports = sendMail;