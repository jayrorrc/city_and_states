const mongoose = require('mongoose');
const State = require('../models/state');
const City = require('../models/city');

// create new or update city
async function post(req, res, next) {

  let name = req.body.name;
  let abbreviation = req.body.abbreviation;

  if (!name && !abbreviation) {
    return res.status(404).json({ state: null, message: 'Request empty' });
  }

  let id = req.body.id;
  let state = null;

  if (id) {
    state = await State.findById(id);

    if (!state) {
      return res.status(404).json({ state: null, message: 'Register not found' });
    }

    state.name = name;
    state.abbreviation = abbreviation;
  } else {
    state = new State({
      _id: mongoose.Types.ObjectId(),
      name: name,
      abbreviation: abbreviation
    });
  }

  state.save((err, st) => {
    if (err) {
      return res.status(500).json({ state: null, message: err.message });
    }

    return res.status(200).json({ state: st });
  });
}

// list states
async function get(req, res, next) {
  let name = req.query.name;
  let abbreviation = req.query.abbreviation;

  let filter = {};
  if (name && abbreviation) {
    filter = { name, abbreviation }
  } else if (name) {
    filter = { name };
  } else if (abbreviation) {
    filter = { abbreviation };
  }

  let state = await State.find(filter).sort('name');

  if (!state) {
    return res.status(404).json({ state: null, message: 'Register not found' });
  }

  return res.status(200).json({ state });
}

// list cities grouped by state
async function getGrouped(req, res, next) {
  let city = req.query.city;
  let name = req.query.state;

  let filter = {};
  if (city && name) {
    let cityName = new RegExp(city, "i");
    let stateName = new RegExp(name, "i");

    filter = { "cities.name": cityName, name: stateName }
  } else if (city) {
    let cityName = new RegExp(city, "i");

    filter = { "cities.name": cityName };
  } else if (name) {
    let stateName = new RegExp(name, "i");

    filter = { name: stateName };
  }

  let state = await State.aggregate([
    {
      $lookup:
      {
        from: 'cities',
        localField: '_id',
        foreignField: 'state',
        as: 'cities'
      }
    }
  ]).match(filter)
    .sort('name');

  if (city) {
    let cityName = new RegExp(city, "i");

    state = state.map((st) => {
      st.cities = st.cities
        .filter(
          (ct) => ct.name.match(cityName))
        .sort((ct1, ct2) => {
          return ct1.name < ct2.name ? -1 : 1
        });

      return st;
    });
  } else {
    state = state.map((st) => {
      st.cities = st.cities
        .sort((ct1, ct2) => {
          return ct1.name < ct2.name ? -1 : 1
        });

      return st;
    })
  }

  return res.status(200).json({ state });
}

// delete state
async function del(req, res, next) {
  let id = req.body.id;

  console.log('id:', id);

  city = await City.remove({ state: id });

  state = await State.deleteOne({ _id: id });

  return res.status(200).json({ state, city });
}

module.exports = {
  post,
  get,
  getGrouped,
  del
};
