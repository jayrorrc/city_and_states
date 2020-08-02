const express = require('express');
const { post, get, del } = require('../controllers/state');
const state = express.Router();

state.post('/', post);
state.get('/', get);
state.delete('/', del);

module.exports = state;
