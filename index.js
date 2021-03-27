const express = require('express');
const app = express();
const sendMail = require('./mail');

const log = console.log;
const path = require('path');
const PORT = 8071;

app.use(express.static('public'))
app.use(express.static('src'))

// Configuring our data parsing
app.use(express.urlencoded({
    extended: true
  }));

app.use(express.json());

// app.get('/', function(req, res) {
//     res.sendFile("index.html")
// });

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'src','mail.html'));
});

app.post('/', (req, res) => {
    //TODO
    //send email here
    const { name, email, title, message } = req.body;
    console.log('User Data: ', req.body);

    sendMail(name, email, title, message, function(err, data) {
        if (err) {
            res.status(500).json({ errMsg: err.message });
        } else {
            res.sendFile(path.join(__dirname, 'src','mail.html'));
        }
    });
});

app.listen(PORT, () => log('Server is starting on PORT,', PORT));