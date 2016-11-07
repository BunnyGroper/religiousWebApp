var express = require('express');
var router = express.Router();

Download = require('../../models/downloadModel')



// Add Bachan Section

router.get('/',ensureAuthenticated, function(req, res, next) {
	Download.getDownload(function(err,downloads){
		if(err){
			console.log(err);
		}else{
			// console.log(bachans);
			res.render('./manage/auth/download/index',{"downloads":downloads}); 
		}
		});
});

router.get('/add',ensureAuthenticated,function(req, res, next) {
	res.render('./manage/auth/download/add'); 
});

router.post('/add',ensureAuthenticated,function(req,res,next){

	var title = req.body.title && req.body.title.trim();
    var duration = req.body.duration && req.body.duration.trim();
    var downloadLink = req.body.downloadLink && req.body.downloadLink.trim();
    var date = new Date();

    console.log("title : "+ title);
    console.log("duration : "+ duration);
    console.log("downloadLink : "+ downloadLink);
    console.log("date : "+ date);

	// Form Validation
	req.checkBody('title','Name field is required').notEmpty();
	req.checkBody('duration','Email is not valid').notEmpty().isInt();
	req.checkBody('downloadLink','Query field is required').notEmpty();	

	// Check for errors
	var errors = req.validationErrors();
	if(errors){
		res.render('/admin/download/add',{
			errors : errors,
			title:title,
			duration:duration,
			download_link:downloadLink,
			date:date
		});
	} else {
		var newDownload = new Download({
			title:title,
			duration:duration,
			download_link:downloadLink,
			date:date
		});

		Download.insertDownload(newDownload,function(err,info){
			if(err) throw err;
			console.log(info);	
		});

		//Success Message
		req.flash('success','Download Content Successfully Inserted');
		res.location('/admin/download/');
		res.redirect('/admin/download/');
	}
});



//  Edit Bachan Section
router.get('/edit/:id',ensureAuthenticated, function (req, res) {  
	Download.getDownloadById({_id:req.params.id},function(err,downloads){
		if(err){
			console.log(err);
		}else{
			console.log(downloads);
			res.render('./manage/auth/download/edit',{"downloads":downloads}); 
		}
		});
	}); 

router.post('/edit/:id',ensureAuthenticated,function(req,res,next){

	var title =  req.body.title && req.body.title.trim();
	var duration = req.body.duration && req.body.duration.trim();
	var downloadLink = req.body.downloadLink && req.body.downloadLink.trim();
	var date = new Date();
	var newDownload = new Download({
		title:title,
		duration:duration,
		download_link:downloadLink,
		date:date
	});
	
	Download.updateDownload({_id:req.params.id},newDownload,function(err,downloads){
		if(err) throw err;
		console.log("updated one : " + downloads);	
	});

	//Success Message
	req.flash('success','Download Section Content Successfully Updated');
	res.location('/admin/download/');
	res.redirect('/admin/download/');
	}
);


// Delete Bachan

router.delete('/delete/:id',ensureAuthenticated,function(req,res){
	Download.deleteDownload({_id:req.params.id},function(err,downloads){
		if(err) throw err;
		});
	req.flash('success',"Content Deleted");
	res.location('/admin/download');
	res.redirect('/admin/download');
});



function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		
		return next();
	}
	req.flash('error','Login is required to access the required webpage !!!!!');
	res.redirect('/admin/login');
}


module.exports = router;


