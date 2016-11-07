var express = require('express');
var router = express.Router();

Katha = require('../../models/kathaModel')

router.get('/', function(req, res, next) {
	Katha.getKatha(function(err,kathas){
		if(err){
			console.log(err);
		}else{
			console.log(kathas);
			res.render('./user/kathas/index',{"kathas":kathas}); 
		}
	});
});

module.exports = router;


