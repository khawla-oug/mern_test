const Category = require('../models/Category'); 

// Add a new category
exports.addCategory = async (req, res) => {
  const { name } = req.body;

  // Validate input
  if (!name) {
    return res.status(400).send('Category name is required');
  }
  try {
    // Create a new category
    const newCategory = new Category({ name });
    await newCategory.save();

    res.status(201).send('Category added successfully');
  } catch (error) {
    // Handle errors (e.g., duplicate entries)
    if (error.code === 11000) {
      return res.status(400).send('Category already exists');
    }
    res.status(500).send('Failed to add category');
  };
}

  // Get all categories
  exports.getAllCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      console.log('Categories from DB:', categories); // Log to see what is being returned from the DB
      res.json(categories); // Make sure it's sending an array
    } catch (error) {
      res.status(500).json({ message: 'Error fetching categories' });
    }
  };
  
  
  

// Add a new category
/*exports.addCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = new Category({ name, addedDate: new Date() });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error adding category' });
  }
};*/




// Delete a category by ID
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
};



