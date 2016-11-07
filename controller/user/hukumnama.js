// 'use strict';

// var IndexModel = require('../models/index');


// module.exports = function (router) {

//     // var model = new IndexModel();

//     router.get('/', function (req, res) {
//         res.render('hukumnama/index');
        
//     });

// };


var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('./user/hukumnama/index'); 
});

module.exports = router;
