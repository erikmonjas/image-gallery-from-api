/* External Imports */
const express = require('express');
const morgan = require('morgan');
const path = require('path');

/* Local Imports */
const { mongoose } = require('./database');
const routes = require('./routes');

/* Consts */
const app = express();
const port = process.env.PORT || 3000;

/* Middlewares */
app.use(morgan('dev'));
app.use(express.json());

/* Routes */
app.use('/prueba', routes);

/* Static files */
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Up on port ${port}`);
});
