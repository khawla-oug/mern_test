const express = require('express');
const Category = require('../models/Category'); 
const categoryController  = require('../controllers/categoryController'); 
console.log(categoryController); // Add this line
const router = express.Router();

// Add a new category
router.post('/added-category', categoryController.addCategory);


router.get('/list-categories', (req, res) => {
    res.send('Categories list route working');
  });
  

// Define routes
router.delete('/categories/:id', categoryController.deleteCategory); 


module.exports = router;
