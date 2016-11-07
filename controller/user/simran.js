var express = require('express');
var router = express.Router();

Simran = require('../../models/simranModel')

router.get('/', function(req, res, next) {
	Simran.getSimran(function(err,simran){
		if(err){
			console.log(err);
		}else{
			console.log(simran);
			res.render('./user/simran/index',{"simrans":simran}); 
		}
	});
});

module.exports = router;


