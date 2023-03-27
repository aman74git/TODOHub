require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// app.use(cors());

app.use('/auth', require('./routes/auth'));
app.use('/todo', require('./routes/todo'));

app.get('/', (req, res) => {
  res.status(400).send('hello');
});

app.listen(process.env.PORT, () =>
  console.log(`listening on port http://localhost:${process.env.PORT}`)
);
