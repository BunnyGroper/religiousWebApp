var express = require('express');
var router = express.Router();

Bachan = require('../../models/bachanModel')



// Add Bachan Section

router.get('/',ensureAuthenticated, function(req, res, next) {
	Bachan.getBachans(function(err,bachans){
		if(err){
			console.log(err);
		}else{
			// console.log(bachans);
			res.render('./manage/auth/bachan/index',{"bachans":bachans}); 
		}
	});
});

// Access add.jade

router.get('/add',ensureAuthenticated,function(req, res, next) {
	res.render('./manage/auth/bachan/add'); 
});

// Post add.jade

router.post('/add',ensureAuthenticated,function(req,res,next){

	var title = req.body.title && req.body.title.trim();
    var place = req.body.place && req.body.place.trim();
    var duration = req.body.duration && req.body.duration.trim();
    var downloadLink = req.body.downloadLink && req.body.downloadLink.trim();
    var date = new Date();

    console.log("title : "+ title);
    console.log("place : "+ place);
    console.log("duration : "+ duration);
    console.log("downloadLink : "+ downloadLink);
    console.log("date : "+ date);

	// Form Validation
	req.checkBody('title','Name field is required').notEmpty();
	req.checkBody('place','Email field is required').notEmpty();
	req.checkBody('duration','Duration must contain Integar value').notEmpty().isInt();
	req.checkBody('downloadLink','Query field is required').notEmpty();	

	// Check for errors
	var errors = req.validationErrors();
	if(errors){
		res.render('./manage/auth/bachan/add',{
			errors : errors,
			title:title,
			place:place,
			duration:duration,
			download_link:downloadLink,
			date:date
		});
	} else {
		var newBachan = new Bachan({
			title:title,
			place:place,
			duration:duration,
			download_link:downloadLink,
			date:date
		});

		Bachan.insertBachan(newBachan,function(err,info){
			if(err) throw err;
			console.log(info);	
		});

		//Success Message
		req.flash('success','Bachan Successfully Inserted');
		res.location('/admin/bachan/');
		res.redirect('/admin/bachan/');
	}
});



//  Edit Bachan Section
router.get('/edit/:id',ensureAuthenticated, function (req, res) {  
	Bachan.getBachanById({_id:req.params.id},function(err,bachans){
		if(err){
			console.log(err);
		}else{
			console.log(bachans);
			res.render('./manage/auth/bachan/edit',{"bachans":bachans}); 
		}
		});
	}); 

router.post('/edit/:id',ensureAuthenticated,function(req,res,next){

	var title =  req.body.title && req.body.title.trim();
	var place =  req.body.place && req.body.place.trim();
	var duration = req.body.duration && req.body.duration.trim();
	var downloadLink = req.body.downloadLink && req.body.downloadLink.trim();
	var date = new Date();

		// Form Validation
	req.checkBody('title','Name field is required').notEmpty();
	req.checkBody('place','Email field is required').notEmpty();
	req.checkBody('duration','Duration must contain Integar value').notEmpty().isInt();
	req.checkBody('downloadLink','Query field is required').notEmpty();	

	// Check for errors
	var errors = req.validationErrors();
	if(errors){
		res.render('./manage/auth/bachan/edit',{
			errors : errors,
			title:title,
			place:place,
			duration:duration,
			download_link:downloadLink,
			date:date
		});
	} else {
				var newBachan = new Bachan({
				title:title,
				place:place,
				duration:duration,
				download_link:downloadLink,
				date:date
				});

				Bachan.updateBachan({_id:req.params.id},newBachan,function(err,bachan){
					if(err) throw err;
					console.log("updated one : " + bachan);	
				});

				//Success Message
				req.flash('success','Bachan Successfully Updated');
				res.location('/admin/bachan/');
				res.redirect('/admin/bachan/');
			}
});


// Delete Bachan

router.delete('/delete/:id',ensureAuthenticated,function(req,res){
	Bachan.deleteBachan({_id:req.params.id},function(err,bachan){
		if(err) throw err;
		});
	req.flash('success',"Bachan Deleted");
	res.location('/admin/bachan');
	res.redirect('/admin/bachan');
});



function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		
		return next();
	}
	req.flash('error','Login is required to access the required webpage !!!!!');
	res.redirect('/admin/login');
}


module.exports = router;


