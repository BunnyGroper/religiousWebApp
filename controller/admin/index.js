var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/userModel');


router.get('/',function(req, res, next) {
  res.render('./manage/auth/index',{
  	'title' : 'Login' 
  });
});


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
	function(username,password,done){
		User.getUserByUsername(username,function(err,user){
				console.log("I m inside LocalStrategy");
			if(err) throw err;
			if(!user){
				console.log('Unknown User');
				return done(null,false,{message: 'Unknown User'})
			}

			User.comparePassword(password,user.password,function(err,isMatch){
				if(err) throw err;
				if(isMatch){
					return done(null,user);
				} else{
					console.log('Invalid Password');
					return done(null,false,{message:'Invalid Password'});
				}
			});
		});
	}
));

 router.post('/',upload.array(),passport.authenticate('local',{failureRedirect:'/admin/login',failureFlash:'Invalid username or password'}),function(req,res){
	console.log('Authentication Succesfull');
	req.flash('success','You are logged in');
	res.redirect('/admin/home');
});


module.exports = router;
