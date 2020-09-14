const express = require('express');
const router = express.Router();
const apiController = require('../app/controllers/apis');

const { check, validationResult } = require('express-validator');

const checkValidator = (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();

}


router.post('/createNewApi',[
    check('apiName').isLength({ min: 1 }),
    check('apiPath').isLength({ min: 1 }),
    check('fields').isLength({ min: 1 }),
    check('bodys').isLength({ min: 1 }),
    check('headers').isLength({ min: 1 }),
    check('codes').isLength({ min: 1 }),

],checkValidator, apiController.createApi);

router.post('/getAllApis',apiController.getAllApis);

module.exports = router;