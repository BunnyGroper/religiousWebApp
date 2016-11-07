var express = require('express');
var router = express.Router();

ContactInfo = require('../../models/contactModel');

router.get('/',ensureAuthenticated,function(req, res, next) {
	ContactInfo.getContactInfo(function(err,contacts){
	if(err){
		console.log(err);
	}else{
		console.log(contacts);
		res.render('./manage/auth/contact/index',{"contacts":contacts}); 
	}
	});
});

function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		
		return next();
	}
	req.flash('error','Login is required to access the required webpage !!!!!');
	res.redirect('/admin/login');
}



module.exports = router;


