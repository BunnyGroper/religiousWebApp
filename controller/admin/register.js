var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
var User = require('../../models/userModel');



/* GET users listing. */


router.get('/',ensureAuthenticated,function(req, res, next) {
  res.render('./manage/auth/register/index',{
  	'title' : 'Login' 
  });
});


router.post('/',ensureAuthenticated,upload.array(),function(req,res,next){
	console.log("i m here!!");
	// Get Form Values

	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.cpassword;
	console.log("Name : "+ username);
	console.log("Password : "+ password);
	console.log("Confirm Password : "+ password2);
	

	// Form Validation
	req.checkBody('username','Username field is required').notEmpty();	
	req.checkBody('password','Password field is required').notEmpty();	
	req.checkBody('cpassword','Passwords do not match').notEmpty(req.body.password);	

	// Check for errors
	var errors = req.validationErrors();
	if(errors){
		res.render('./manage/auth/register/add',{
			errors : errors,
			username:username,
			password:password,
			password2:password2
		});
	} else {
		var newUser = new User({
			username:username,
			password:password
		});

		// Create User
		User.createUser(newUser,function(err,user){
			if(err) throw err;
			console.log(user);	
		});

		//Success Message
		req.flash('success','You can now registered and may log in');
		res.location('/');
		res.redirect('/');
	 }
});

function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		
		return next();
	}
	req.flash('error','Login is required to access the required webpage !!!!!');
	res.redirect('/admin/login');
}





module.exports = router;
