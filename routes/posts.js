const express = require('express');
const router = express.Router();
const postController = require('../app/controllers/posts');


const { check, validationResult } = require('express-validator');

const checkValidator = (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({status:422, data: errors.array() });
    }
    next();

}

router.post('/addNewPost',postController.addNewPost)
router.get('/postList',postController.postList);
router.post('/postWithCategory',postController.postWithCategory);
router.post('/single',postController.single)
module.exports = router;