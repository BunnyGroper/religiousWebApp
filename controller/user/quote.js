var express = require('express');
var router = express.Router();

Quote = require('../../models/quoteModel')

router.get('/', function(req, res, next) {
	Quote.getQuotes(function(err,quotes){
		if(err){
			console.log(err);
		}else{
			console.log(quotes);
			res.render('./user/quotes/index',{"quotes":quotes}); 
		}
	});
});

module.exports = router;


