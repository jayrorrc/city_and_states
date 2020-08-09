const express = require('express');
const { post, get, getGrouped, del } = require('../controllers/state');
const state = express.Router();

state.post('/', post);
state.get('/', get);
state.get('/grouped', getGrouped);
state.delete('/', del);

module.exports = state;
