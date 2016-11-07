var express = require('express');
var router = express.Router();

KathaVideo = require('../../models/viewKathaModel')

router.get('/', function(req, res, next) {
	KathaVideo.getKathaVideo(function(err,kathas){
		if(err){
			console.log(err);
		}else{
			console.log(kathas);
			res.render('./user/viewKatha/index',{"kathas":kathas}); 
		}
	});
});

module.exports = router;


