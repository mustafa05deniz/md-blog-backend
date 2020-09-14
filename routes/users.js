const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/users');


const { check, validationResult } = require('express-validator');

const checkValidator = (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({status:422, data: errors.array() });
    }
    next();

}

router.post('/register',[
    check('name').optional(),
    check('email').isEmail(),
    check('password').isLength({ min: 5 }),
    
    
],checkValidator, userController.create);

router.post('/authenticate',[
    check('email').isEmail(),
    check('password').isLength({ min: 5 }),
],checkValidator, userController.authenticate);



module.exports = router;