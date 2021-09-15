// require('./models/User');
require('./models/todo');
const express = require('express');
const mongoose = require('mongoose');
// const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const bodyParser = require('body-parser');
// const requireAuth = require('./middleware/requireAuth');
var session = require('express-session');
const cors = require('cors');

let port = process.env.PORT || 3001;

const app = express();
app.use(cors())
app.use(bodyParser.json());
// app.use(authRoutes);
app.use(todoRoutes);
app.use(session({
    secret: 'djhxcvxfgshjfgjhgsjhfgakjeauytsdfy',
    resave: false,
    saveUninitialized: true
}));

// mongoose.connect('mongodb://127.0.0.1:27017/todo-data', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// })

mongoose.connect('mongodb+srv://admin:passwordpassword@cluster0.bkwnw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
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

app.get('/', (req, res) => {
    res.send(`your name is anything.`);
})


app.listen(port, () => {
    console.log('app is listening on port ' + port)
})



// start mongodb server /Akhil/mongodb/bin/mongod.exe --dbpath=/Akhil/mongodb-data