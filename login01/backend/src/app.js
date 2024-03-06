const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const router = require('./router')(path.join(__dirname, '../../', 'public'));

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../', 'public')));
app.use('/', router);

module.exports = app;
