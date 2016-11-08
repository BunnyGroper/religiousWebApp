var express = require('express');
var router = express.Router();

KathaVideo = require('../../models/viewKathaModel')

router.get('/',ensureAuthenticated, function(req, res, next) {
	KathaVideo.getKathaVideo(function(err,kathas){
		if(err){
			console.log(err);
		}
		else{
			// console.log(kathas);
			res.render('./manage/auth/viewKatha/index',{"kathas":kathas}); 
		}
	});
});


router.get('/add',ensureAuthenticated,function(req, res, next) {
	res.render('./manage/auth/viewKatha/add'); 
});

router.post('/add',ensureAuthenticated,function(req,res,next){

	var title = req.body.title && req.body.title.trim();
    var link = req.body.link && req.body.link.trim();
    var date = new Date();


	// Form Validation
	req.checkBody('title','Name field is required').notEmpty();
	req.checkBody('link','Email field is required').notEmpty();


	// Check for errors
	var errors = req.validationErrors();
	if(errors){
		res.render('./manage/auth/viewKatha/add',{
			errors : errors,
			title:title,
			link:link,
			date:date
		});
	} else {
		var newviewKatha = new KathaVideo({
			title:title,
			link:link,
			date:date
		});

		KathaVideo.insertKatha(newviewKatha,function(err,info){
			if(err) throw err;
			console.log(info);	
		});

		//Success Message
		req.flash('success','Content Successfully Inserted');
		res.location('/admin/viewKatha/');
		res.redirect('/admin/viewKatha/');
	}
});



//  Edit Bachan Section
router.get('/edit/:id',ensureAuthenticated, function (req, res) {  
	KathaVideo.getKathaVideoById({_id:req.params.id},function(err,kathas){
		if(err){
			console.log(err);
		}else{
			// console.log(kathas);
			res.render('./manage/auth/viewKatha/edit',{"kathas":kathas}); 
		}
		});
	}); 

router.post('/edit/:id',ensureAuthenticated,function(req,res,next){

	var title = req.body.title && req.body.title.trim();
    var link = req.body.link && req.body.link.trim();
    var date = new Date();


	// Form Validation
	req.checkBody('title','Name field is required').notEmpty();
	req.checkBody('link','Email field is required').notEmpty();

	var newviewKatha = new KathaVideo({
			title:title,
			link:link,
			date:date
		});

	console.log("newviewKatha : " + newviewKatha);

	KathaVideo.updateKathaVideo({_id:req.params.id},newviewKatha,function(err,kathas){
		if(err) throw err;
		console.log("updated one : " + kathas);	
	});

	//Success Message
	req.flash('success','Youtube Katha Successfully Updated');
	res.location('/admin/viewKatha/');
	res.redirect('/admin/viewKatha/');
	}
);


// Delete KathaVideo

router.delete('/delete/:id',ensureAuthenticated,function(req,res){
	KathaVideo.deleteKathaVideo({_id:req.params.id},function(err,kathavideo){
		if(err) throw err;
		});
	req.flash('success',"Youtube Video Deleted");
	res.location('/admin/viewKatha');
	res.redirect('/admin/viewKatha');
});



function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		
		return next();
	}
	req.flash('error','Login is required to access the required webpage !!!!!');
	res.redirect('/admin/login');
}


module.exports = router;

