var express = require('express');
var router = express.Router();

router.get('/',function(req, res) {
	
	req.flash('success','You have logged out');
	req.session.destroy();
	res.redirect('/admin/login');
});

module.exports = router;


