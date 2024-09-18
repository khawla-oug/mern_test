const mongoose = require('mongoose');

// Define the Category schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  addedDate: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Category', categorySchema,'categories');
