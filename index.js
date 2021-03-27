const express = require("express");
const app = express();
// const sendMail = require('email');
const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

const dotenv = require("dotenv");
dotenv.config();

const path = require("path");

app.use(express.static("public"));
app.use(express.static("src"));

// Configuring our data parsing
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile("index.html");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "src", "mail.html"));
});

app.post("/", (req, res) => {
  //TODO
  //send email here
  const { name, email, title, message } = req.body;

  const auth = {
    auth: {
      api_key: process.env.APIKEY,
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
      } else {
        cb(null, data);
      }
    });
  };

  sendMail(name, email, title, message, function (err, data) {
    if (err) {
      res.status(500).json({ errMsg: err.message });
    } else {
      res.sendFile(path.join(__dirname, "src", "mail.html"));
    }
  });
});
const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Server is starting on PORT,", PORT));
