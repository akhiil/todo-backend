require('./models/User');
require('./models/todo');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./middleware/requireAuth');
var session = require('express-session');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(authRoutes);
app.use(todoRoutes);
app.use(session({
    secret: 'djhxcvxfgshjfgjhgsjhfgakjeauytsdfy',
    resave: false,
    saveUninitialized: true
}));

mongoose.connect('mongodb://127.0.0.1:27017/todo-data', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('connected to mongo instance')
})

mongoose.connection.on('error', (err) => {
    console.error('error connecting to mongo', err);
});

app.get('/', requireAuth, (req, res) => {
    res.send(`your name is ${req.user.name} and your mail is ${req.user.email}.`);
})

app.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            //console.log(err);
            res.status(400).send(err.message);
        }
        else {
            res.send('logged out');
        }
    });
})

app.listen(3000, () => {
    console.log('app is listening on port 3000')
})



// start mongodb server /Akhil/mongodb/bin/mongod.exe --dbpath=/Akhil/mongodb-data