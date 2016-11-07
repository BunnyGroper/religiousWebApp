var express = require('express');
var router = express.Router();

Simran = require('../../models/simranModel')



// Add Simran Section

router.get('/',ensureAuthenticated, function(req, res, next) {
	Simran.getSimran(function(err,simrans){
		if(err){
			console.log(err);
		}else{
			// console.log(simrans);
			res.render('./manage/auth/simran/index',{"simrans":simrans}); 
		}
		});
});

router.get('/add',ensureAuthenticated,function(req, res, next) {
	res.render('./manage/auth/simran/add'); 
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
		res.render('/admin/simran/add',{
			errors : errors,
			title:title,
			duration:duration,
			download_link:downloadLink,
			date:date
		});
	} else {
		var newSimran = new Simran({
			title:title,
			duration:duration,
			download_link:downloadLink,
			date:date
		});

		Simran.insertSimran(newSimran,function(err,info){
			if(err) throw err;
			console.log(info);	
		});

		//Success Message
		req.flash('success','Simran Successfully Inserted');
		res.location('/admin/simran/');
		res.redirect('/admin/simran/');
	}
});



//  Edit Simran Section
router.get('/edit/:id',ensureAuthenticated, function (req, res) {  
	console.log(req.params.id);
	Simran.getSimranById({_id:req.params.id},function(err,Simrans){
		if(err){
			console.log(err);
		}else{
			console.log(Simrans);
			res.render('./manage/auth/simran/edit',{"Simrans":Simrans}); 
		}
		});
	}); 

router.post('/edit/:id',ensureAuthenticated,function(req,res,next){

	var title =  req.body.title && req.body.title.trim();
	var place =  req.body.place && req.body.place.trim();
	var duration = req.body.duration && req.body.duration.trim();
	var downloadLink = req.body.downloadLink && req.body.downloadLink.trim();
	var dateArr = new Date();
	var date = dateArr.toString();
	var newSimran = new Simran({
		title:title,
		place:place,
		duration:duration,
		download_link:downloadLink,
		date:date
	});
	
	Simran.updateSimran({_id:req.params.id},newSimran,function(err,Simran){
		if(err) throw err;
		console.log("updated one : " + Simran);	
	});

	//Success Message
	req.flash('success','Simran Successfully Updated');
	res.location('/admin/simran/');
	res.redirect('/admin/simran/');
	}
);


// Delete Simran

router.delete('/delete/:id',ensureAuthenticated,function(req,res){
	Simran.deleteSimran({_id:req.params.id},function(err,Simran){
		if(err) throw err;
		});
	req.flash('success',"Simran Deleted");
	res.location('/admin/simran');
	res.redirect('/admin/simran');
});



function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		
		return next();
	}
	req.flash('error','Login is required to access the required webpage !!!!!');
	res.redirect('/admin/login');
}


module.exports = router;


