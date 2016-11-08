var express = require('express');
var router = express.Router();

Schedule  = require('../../models/scheduleModel');



// Add Schedule  Section

router.get('/',ensureAuthenticated, function(req, res, next) {
	Schedule.getSchedule(function(err,schedules){
		if(err){
			console.log(err);
		}else{
			// console.log(Schedule s);
			res.render('./manage/auth/schedule/index',{"schedules":schedules}); 
		}
		});
});

router.get('/add',ensureAuthenticated,function(req, res, next) {
	res.render('./manage/auth/schedule/add'); 
});

router.post('/add',ensureAuthenticated,function(req,res,next){

	var date = req.body.date && req.body.date.trim();
    var place = req.body.place && req.body.place.trim();
    var direction = req.body.direction && req.body.direction.trim();
    var link = req.body.link && req.body.link.trim();
    var sysdate = new Date();
    var  date = req.body.date && req.body.date.trim();

	// Form Validation
	req.checkBody('date','Date field is required').notEmpty();
	req.checkBody('place','Place field is required').notEmpty();
	req.checkBody('direction','Direction is not valid').notEmpty();
	req.checkBody('link','Link field is required').notEmpty();	
	req.checkBody('date','Sysdate field is required').notEmpty();	


	// Check for errors
	var errors = req.validationErrors();
	if(errors){
		res.render('./manage/auth/schedule/add',{
			errors : errors,
			date:date,
			place:place,
			direction:direction,
			link:link
		});
	} else {
		var newSchedule  = new Schedule ({
			date:date,
			place:place,
			direction:direction,
			link:link,
			date:date,
			sysdate:sysdate
		});

		// console.log("newSchedule : " + newSchedule);

		Schedule.insertSchedule(newSchedule,function(err,info){
			if(err) throw err;
			console.log(info);	
		});

		//Success Message
		req.flash('success','Schedule  Successfully Inserted');
		res.location('/admin/schedule/');
		res.redirect('/admin/schedule/');
	}
});



//  Edit Schedule  Section
router.get('/edit/:id',ensureAuthenticated, function (req, res) {  
	Schedule.getScheduleById({_id:req.params.id},function(err,schedules){
		if(err){
			console.log(err);
		}else{
			console.log(schedules);
			res.render('./manage/auth/schedule/edit',{"schedules":schedules}); 
		}
		});
	}); 

router.post('/edit/:id',ensureAuthenticated,function(req,res,next){

	var date = req.body.date && req.body.date.trim();
    var place = req.body.place && req.body.place.trim();
    var direction = req.body.direction && req.body.direction.trim();
    var link = req.body.link && req.body.link.trim();
    var sysdate = new Date();
    var date = req.body.date && req.body.date.trim();
	var newSchedule  = new Schedule ({
		date:date,
		place:place,
		direction:direction,
		link:link,
		date:date,
		sysdate:sysdate
	});

	console.log("newSchedule : " + newSchedule);
	
	Schedule.updateSchedule({_id:req.params.id},newSchedule,function(err,schedules){
		if(err) throw err;
		console.log("updated one : " + schedules );	
	});

	//Success Message
	req.flash('success','Schedule  Successfully Updated');
	res.location('/admin/schedule/');
	res.redirect('/admin/schedule/');
	}
);


// Delete Schedule 

router.delete('/delete/:id',ensureAuthenticated,function(req,res){
	Schedule .deleteSchedule ({_id:req.params.id},function(err,schedules){
		if(err) throw err;
		});
	req.flash('success',"Schedule  Deleted");
	res.location('/admin/schedule');
	res.redirect('/admin/schedule');
});



function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		
		return next();
	}
	req.flash('error','Login is required to access the required webpage !!!!!');
	res.redirect('/admin/login');
}


module.exports = router;


