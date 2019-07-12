
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: String,
  color: String,
  size: String,
  brand: String,
  timeframe: Number

}, {
  timestamps: true
});

// Ensure that initials are uppercase & not longer than 3 characters
itemSchema.pre('save', function(next) {
  this.itemName = this.itemName.toUpperCase();
  next();
});

module.exports = mongoose.model('Item', itemSchema);