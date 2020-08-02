const mongoose = require('mongoose');
const State = require('../models/state');
const City = require('../models/city');

// create new or update state
async function post(req, res, next) {

  let name = req.body.name;
  let stateId = req.body.stateId;

  if (!name && !stateId) {
    return res.status(404).json({ state: null, message: 'Request empty' });
  }

  let id = req.body.id;
  let city = null;
  let state = await State.findById(stateId);

  if (!state) {
    return res.status(404).json({ city: null, message: 'State not found' });
  }

  if (id) {
    city = await City.findById(id);

    if (!city) {
      return res.status(404).json({ city: null, message: 'Register not found' });
    }

    city.name = name;
    city.state = state;

  } else {
    city = new City({
      _id: mongoose.Types.ObjectId(),
      name,
      state
    });
  }

  city.save((err, ct) => {
    if (err) {
      return res.status(500).json({ city: null, message: err.message });
    }

    return res.status(200).json({ city: ct });
  });
}

// list states
async function get(req, res, next) {
  let name = req.query.name;
  let stateId = req.query.stateId;

  let filter = {};
  if (name && stateId) {
    filter = { name, state: { '$in': stateId } }
  } else if (name) {
    filter = { name };
  } else if (stateId) {
    filter = { state: { '$in': stateId } };
  }

  let city = await City.find(filter);

  if (city) {
    return res.status(200).json({ city });
  }

  return res.status(404).json({ city: null, message: 'Register not found' });
}

// delete state
async function del(req, res, next) {
  let id = req.body.id;

  city = await City.deleteOne({ _id: id });

  return res.status(200).json({ city });
}

module.exports = {
  post,
  get,
  del
};
