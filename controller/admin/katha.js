var express = require('express');
var router = express.Router();

Katha = require('../../models/kathaModel')



// Add Katha Section

router.get('/',ensureAuthenticated, function(req, res, next) {
	Katha.getKatha(function(err,katha){
		if(err){
			console.log(err);
		}else{
			res.render('./manage/auth/katha/index',{"katha":katha}); 
		}
		});
});

router.get('/add',ensureAuthenticated,function(req, res, next) {
	res.render('./manage/auth/katha/add'); 
});

router.post('/add',ensureAuthenticated,function(req,res,next){

	var shabad_p = req.body.shabad_p && req.body.shabad_p.trim();
	var shabad_h = req.body.shabad_h && req.body.shabad_h.trim();
	var shabad_pe = req.body.shabad_pe && req.body.shabad_pe.trim();
	var meaning_e = req.body.meaning_e && req.body.meaning_e.trim();
    var ang = req.body.ang && req.body.ang.trim();
    var place = req.body.place && req.body.place.trim();
    var downloadLink = req.body.downloadLink && req.body.downloadLink.trim();
    var date = new Date();


	// Form Validation
	req.checkBody('shabad_p','Name field is required').notEmpty();
	req.checkBody('shabad_h','Name field is required').notEmpty();
	req.checkBody('shabad_pe','Name field is required').notEmpty();
	req.checkBody('meaning_e','Name field is required').notEmpty();
	req.checkBody('place','Email field is required').notEmpty();
	req.checkBody('downloadLink','Query field is required').notEmpty();	
	req.checkBody('ang','Ang field is required').notEmpty();	

	// Check for errors
	var errors = req.validationErrors();
	if(errors){
		res.render('./manage/auth/katha/add',{
			errors : errors,
			shabad_p:shabad_p,
			shabad_h:shabad_h,
			shabad_pe:shabad_pe,
			meaning_e : meaning_e,
			place:place,
			download_link:downloadLink,
			ang:ang
		});
	} else {
		var newKatha = new Katha({
			shabad_p:shabad_p,
			shabad_h:shabad_h,
			shabad_pe:shabad_pe,
			meaning_e : meaning_e,
			place:place,
			download_link:downloadLink,
			ang:ang,
			date:date
		});

		Katha.insertKatha(newKatha,function(err,info){
			if(err) throw err;
			console.log(info);	
		});

		//Success Message
		req.flash('success','Katha Successfully Inserted');
		res.location('/admin/katha/');
		res.redirect('/admin/katha/');
	}
});



//  Edit Katha Section
router.get('/edit/:id',ensureAuthenticated, function (req, res) {  
	Katha.getKathaById({_id:req.params.id},function(err,katha){
		if(err){
			console.log(err);
		}else{
			console.log(katha);
			res.render('./manage/auth/katha/edit',{"katha":katha}); 
		}
		});
	}); 

router.post('/edit/:id',ensureAuthenticated,function(req,res,next){
	var shabad_p = req.body.shabad_p && req.body.shabad_p.trim();
	var shabad_h = req.body.shabad_h && req.body.shabad_h.trim();
	var shabad_pe = req.body.shabad_pe && req.body.shabad_pe.trim();
	var meaning_e = req.body.meaning_e && req.body.meaning_e.trim();
    var ang = req.body.ang && req.body.ang.trim();
    var place = req.body.place && req.body.place.trim();
    var downloadLink = req.body.downloadLink && req.body.downloadLink.trim();
    var date = new Date();
	var newKatha = new Katha({
		shabad_p:shabad_p,
		shabad_h:shabad_h,
		shabad_pe:shabad_pe,
		meaning_e : meaning_e,
		place:place,
		download_link:downloadLink,
		ang:ang,
		date:date
	});
	
	Katha.updateKatha({_id:req.params.id},newKatha,function(err,katha){
		if(err) throw err;
		console.log("updated one : " + katha);	
	});

	//Success Message
	req.flash('success','Katha Successfully Updated');
	res.location('/admin/katha/');
	res.redirect('/admin/katha/');
	}
);


// Delete Katha

router.delete('/delete/:id',ensureAuthenticated,function(req,res){
	Katha.deleteKatha({_id:req.params.id},function(err,katha){
		if(err) throw err;
		});
	req.flash('success',"Katha Deleted");
	res.location('/admin/katha');
	res.redirect('/admin/katha');
});



function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash('error','Login is required to access the required webpage !!!!!');
	res.redirect('/admin/login');
}


module.exports = router;


