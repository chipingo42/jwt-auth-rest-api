const express = require('express');
const router = express.Router();
const { Product } = require('../models/products')


// All Post products api will store here
router.get('/api', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({products, code: 200, message: 'All Product successfull'})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})


// Save products
router.post('/api/products/add', async (req,res) => {
  try {
    const prdct = await Product.create(req.body)
    res.status(200).json({prdct, code: 200, message: 'Product Added successfull'});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message })
  }
})

// Get a single products
router.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const prdct = await Product.findById(id);
    res.status(200).json(prdct);
    
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

// Update products
router.put('/api/products/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const prdct = await Product.findByIdAndUpdate(id, req.body)
    // we can not find any Product in database
    if (!prdct) {
      return res.status(404).json({message: `cannot find any Product with ID ${id}`});
    }
    const udatedProduct = await Product.findById(id)
    res.status(200).json({udatedProduct, code: 200, message: 'Product updated successfull '});
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

// Delete products
router.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const prdct = await Product.findByIdAndDelete(id);
    if (!prdct) res.status(404).json({message: `cannot find any Product with ID ${id}`})
    res.status(200).json({prdct, code: 200, message: 'Product Deleted successfull '})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

module.exports = router;