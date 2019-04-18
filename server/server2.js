//Should be server.js but since we are not allowed to delete other people's code, a new file.

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

const app = express();

// While adding fb or any other auth, make changes to this file
require('./config/passport')(passport);

// DB config
const db = require('./config/keys').mongoURI;

mongoose.connect( db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Body parser    
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

app.use(passport.initialize());
app.use(passport.session());

app.listen(3001, console.log(`Server started on port 3000`));