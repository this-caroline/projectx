const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');

require('dotenv').config();

app.use(express.json());
app.use(routes);
app.use(cors())

app.listen(3000, () => console.log(`API on:localhost:3000`));
