const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const keys = require('./config/keys');

const app = express();

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(session({
  secret: 'secret12345',
  resave: false,
  saveUninitialized: true
}))

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('connected to mongodb server'))
  .catch(err => console.log(err));

// passport config
require('./config/passport')(passport);

// load routes
const auth = require('./routes/auth');

app.use('/auth', auth);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/dashboard', (req, res) => {
  res.send('Dashboard');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});