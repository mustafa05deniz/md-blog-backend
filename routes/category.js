const express = require('express');
const router = express.Router();
const CategoryController = require('../app/controllers/category');


const { check, validationResult } = require('express-validator');

const checkValidator = (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({status:422, data: errors.array() });
    }
    next();

}

router.post('/addNewCategory',CategoryController.addNewCategory)
router.post('/updateCategory',CategoryController.updateCategory)
router.get('/categoryList',CategoryController.categoryList)
module.exports = router;