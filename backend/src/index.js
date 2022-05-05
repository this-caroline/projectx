const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');

require('dotenv').config();
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
app.use(express.json());
app.use(routes);
app.use(cors())

app.listen(3000, () => console.log(`API on:localhost:3000`));
