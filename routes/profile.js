const express = require('express');
const router = express.Router();
const profileController = require('../app/controllers/profile');


const { check, validationResult } = require('express-validator');

const checkValidator = (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({status:422, data: errors.array() });
    }
    next();

}

router.get('/user_info',profileController.user_info);
router.post('/addNewUser',profileController.addNewUser)
router.get('/userList',profileController.userList);


module.exports = router;