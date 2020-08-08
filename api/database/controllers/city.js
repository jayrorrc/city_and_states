const mongoose = require('mongoose');
const State = require('../models/state');
const City = require('../models/city');

// create new or update city
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

// list cities
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

  let city = await City.find(filter).sort('name');

  if (!city) {
    return res.status(404).json({ city: null, message: 'Register not found' });
  }

  return res.status(200).json({ city });
}

// list cities grouped by state
async function getGrouped(req, res, next) {
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

  let city = await City.find(filter)
    .populate('state');

  if (!city) {
    return res.status(404).json({ city: null, message: 'Register not found' });
  }

  city = city.reduce((acc, ct) => {
    if (acc[ct.state.name]) {
      acc[ct.state.name]['cities'].push({ name: ct.name, id: ct._id });
    } else {
      acc[ct.state.name] = {
        id: ct.state._id,
        cities: [{ name: ct.name, id: ct._id }]
      };
    }

    acc[ct.state.name].cities.sort((ct1, ct2) => {
      return ct1.name < ct2.name ? -1 : 1
    });

    return acc;
  }, {});

  city = Object.keys(city).map((st) => {
    return {
      name: st,
      cities: city[st]['cities'],
      id: city[st]['id']
    };
  });

  return res.status(200).json({ city });
}

// delete city
async function del(req, res, next) {
  let id = req.body.id;

  city = await City.deleteOne({ _id: id });

  return res.status(200).json({ city });
}

module.exports = {
  post,
  get,
  getGrouped,
  del
};
