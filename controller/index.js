var express = require('express');
var router = express.Router();
Image = require('../models/imgModel')


/* GET home page. */
router.get('/', function(req, res, next) {
  	Image.getImages(function(err,images){
		if(err){
			console.log(err);
		}else{
			console.log(images);
			res.render('index',{"images":images}); 
		}
		});
});


module.exports = router;
