const mongoose = require('mongoose')


// Employee SCHEMA
const Product = mongoose.model('Products', {
  title: {
    type: String,
    required: [true, "please enter a product name"]
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
})




module.exports = { Product };
