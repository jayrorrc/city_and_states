const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('We have an api!!!');
});

module.exports = routes;