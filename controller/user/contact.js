var express = require('express');
var router = express.Router();

ContactInfo = require('../../models/contactModel');

router.get('/', function(req, res, next) {
	res.render('./user/contact/index');
});


router.post('/',function(req,res,next){
	console.log("i m here!!");
	// Get Form Values

	var name = req.body.name;
	var email = req.body.email;
	var query = req.body.query;
	var date = new Date();

	console.log(name);
	console.log(email);
	console.log(query);
	console.log(date);

	// Form Validation
	req.checkBody('name','Name field is required').notEmpty();
	req.checkBody('email','Email field is required').notEmpty();
	req.checkBody('email','Email is not valid').isEmail();
	req.checkBody('query','Query field is required').notEmpty();	

	// Check for errors
	var errors = req.validationErrors();
	if(errors){
		res.render('/',{
			errors : errors,
			name : name,
			email:email,
			query:query
		});
	} else {
		var newContactInfo = new ContactInfo({
			name : name,
			email:email,
			query:query,
			date:date
		});

		ContactInfo.insertContact(newContactInfo,function(err,info){
			if(err) throw err;
			console.log(info);	
		});

		//Success Message
		req.flash('success','Thank you for your.We will be in touch with You');
		res.location('/');
		res.redirect('/');
	}
});

module.exports = router;


