const express = require('express');
const { post, get, getGrouped, del } = require('../controllers/city');
const city = express.Router();

city.post('/', post);
city.get('/', get);
city.get('/grouped', getGrouped);
city.delete('/', del);

module.exports = city;
