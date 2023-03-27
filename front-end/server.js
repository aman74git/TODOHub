require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const homeAuth = require('./middleware/homeAuth');
const loginAuth = require('./middleware/loginAuth');
const logoutHandler = require('./controller/logoutHanldler');

const app = express();

app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './public/views');

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', loginAuth, (req, res) => {
  res.render('login', { currPage: 'login' });
});
app.get('/register', loginAuth, (req, res) => {
  res.render('register', { currPage: 'reg' });
});
app.get('/home', homeAuth, (req, res) => {
  res.render('home', { currPage: 'home' });
});
app.get('/logout', homeAuth, logoutHandler);

app.get('*', (req, res) => {
  res.send(
    `<h2>Error: 404 Route not found<br><a href="http://localhost:4500">found app here</a></h2>`
  );
});

app.listen(process.env.FRONT_END_PORT, () =>
  console.log(
    `listening frontend on port http://localhost:${process.env.FRONT_END_PORT}`
  )
);
