const express = require('express');
const routes = express.Router();
const verifyToken = require('../../middleware/verifytoken');

routes.get('/', (req, res) => {
    res.send('We have an api!!!');
});

routes.use('/user', require('./user'));
routes.use('/state', verifyToken, require('./state'));
routes.use('/city', verifyToken, require('./city'));

module.exports = routes;
