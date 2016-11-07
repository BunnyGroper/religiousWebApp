var express = require('express');
var router = express.Router();

Bachan = require('../../models/bachanModel')

router.get('/', function(req, res, next) {
	Bachan.getBachans(function(err,bachans){
		if(err){
			console.log(err);
		}else{
			console.log(bachans);
			res.render('./user/bachan/index',{"bachans":bachans}); 
		}
	});
});

module.exports = router;


