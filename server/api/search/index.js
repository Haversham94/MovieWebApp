'use strict';

var express = require('express');
var controller = require('./search.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:query/:category', controller.show);



module.exports = router;
