const express = require('express');
const { post, get, del } = require('../controllers/city');
const city = express.Router();

city.post('/', post);
city.get('/', get);
city.delete('/', del);

module.exports = city;
