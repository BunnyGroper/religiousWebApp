var express = require('express');
var router = express.Router();

Schedule = require('../../models/scheduleModel')

router.get('/', function(req, res, next) {
	Schedule.getSchedule(function(err,schedules){
		if(err){
			console.log(err);
		}else{
			console.log(schedules);
			res.render('./user/schedule/index',{"schedules":schedules}); 
		}
	});
});

module.exports = router;


