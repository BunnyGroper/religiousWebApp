var express = require('express');
var router = express.Router();

Download = require('../../models/downloadModel')

router.get('/', function(req, res, next) {
	Download.getDownload(function(err,download){
		if(err){
			console.log(err);
		}else{
			console.log(download);
			res.render('./user/download/index',{"downloads":download}); 
		}
	});
});

module.exports = router;


