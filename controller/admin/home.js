var express = require('express');
var router = express.Router();

router.get('/',ensureAuthenticated,function(req, res, next) {
	res.render('./manage/auth/home/index');
});

function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		
		return next();
	}
	req.flash('error','Login is required to access the required webpage !!!!!');
	res.redirect('/admin/login');
}

module.exports = router;


