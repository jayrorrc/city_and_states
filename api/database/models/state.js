const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const stateSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true
  },
  abbreviation: {
    type: String,
    validate: {
      validator: (ab) => /^[A-Z]{2}$/.test(ab),
      message: (props) => `The value \"${props.value}\" contain more than two letters, lower case or numbers`
    },
    required: true,
    unique: true
  }
}, { timestamps: true });

module.exports = mongoose.model('State', stateSchema);;
