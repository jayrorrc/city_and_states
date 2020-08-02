const mongoose = require('mongoose');
const State = require('../models/state');

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

  let state = await State.find(filter);

  if (state) {
    return res.status(200).json({ state });
  }

  return res.status(404).json({ state: null, message: 'Register not found' });
}

// delete state
async function del(req, res, next) {
  let id = req.body.id;

  state = await State.deleteOne({ _id: id });

  return res.status(200).json({ state });
}

module.exports = {
  post,
  get,
  del
};
