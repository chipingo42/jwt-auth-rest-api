const express = require('express');
const router = express.Router();
const { Employee } = require('../models/employee')




//Post All Empoyees
router.get('/api', async (req, res) => {
  try {
    const employes = await Employee.find({});
    res.status(200).json({employes, code: 200, message: 'All Employees successfull'})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})


// Save Employees
router.post('/api/employees/add', async (req,res) => {
  try {
    const emp = await Employee.create(req.body)
    res.status(200).json({emp, code: 200, message: 'Employee Added successfull'});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message })
  }
})

// Get a swingle Employee
router.get('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await Employee.findById(id);
    res.status(200).json(emp);
    
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

// Update Emplyees
router.put('/api/employees/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await Employee.findByIdAndUpdate(id, req.body)
    // we can not find any Employee in database
    if (!emp) {
      return res.status(404).json({message: `cannot find any Employee with ID ${id}`});
    }
    const udatedEmployee = await Employee.findById(id)
    res.status(200).json({udatedEmployee, code: 200, message: 'Employee updated successfull '});
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

// Delete Employee
router.delete('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await Employee.findByIdAndDelete(id);
    if (!emp) res.status(404).json({message: `cannot find any Employee with ID ${id}`})
    res.status(200).json({emp, code: 200, message: 'Employee Deleted successfull '})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

module.exports = router;