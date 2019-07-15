
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// user: my _id,
// person: person i'm loaning or borrowing from
// lentout: true means lentout, false means borrowed
// name: who i loaned or borrowed from
// (color size brand): as decribed
// timeframe: number of days it's meant to be leant/borrowed for
const itemSchema = new Schema({
  user: String,
  person: String,
  lentout: Boolean, 
  name: String,
  color: String,
  size: String,
  brand: String,
  timeframe: Number,
}, {
  timestamps: true
});

// Ensure that initials are uppercase & not longer than 3 characters
itemSchema.pre('save', function(next) {
  //this.itemName = this.itemName.toUpperCase();
  next();
});

module.exports = mongoose.model('Item', itemSchema);