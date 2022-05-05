const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');

require('dotenv').config();
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST','PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.setHeader('Access-Control-Allow-Headers', 'content-type, Authorization');
    next();
  });
app.use(express.json());
app.use(routes);
app.use(cors())

app.listen(3000, () => console.log(`API on:localhost:3000`));
