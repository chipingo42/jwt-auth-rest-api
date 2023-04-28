const express = require('express');
const router = express.Router();
const { Product } = require('../models/products')


// All Post products api will store here
router.get('/api', async (req, res) => {
  try {
    const employes = await Product.find({});
    res.status(200).json({employes, code: 200, message: 'All Employees successfull'})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})


// Save products
router.post('/api/products/add', async (req,res) => {
  try {
    const emp = await Product.create(req.body)
    res.status(200).json({emp, code: 200, message: 'Employee Added successfull'});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message })
  }
})

// Get a swingle products
router.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await Product.findById(id);
    res.status(200).json(emp);
    
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

// Update products
router.put('/api/products/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await Product.findByIdAndUpdate(id, req.body)
    // we can not find any Employee in database
    if (!emp) {
      return res.status(404).json({message: `cannot find any Employee with ID ${id}`});
    }
    const udatedEmployee = await Product.findById(id)
    res.status(200).json({udatedEmployee, code: 200, message: 'Employee updated successfull '});
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

// Delete products
router.delete('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await Product.findByIdAndDelete(id);
    if (!emp) res.status(404).json({message: `cannot find any Employee with ID ${id}`})
    res.status(200).json({emp, code: 200, message: 'Employee Deleted successfull '})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

module.exports = router;