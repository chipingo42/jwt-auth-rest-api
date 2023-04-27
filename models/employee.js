const { string } = require('joi');
const mongoose = require('mongoose')

// Employee SCHEMA
const Employee = mongoose.model('Employees', {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
})




module.exports = { Employee };
