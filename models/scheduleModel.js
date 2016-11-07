var mongoose = require('mongoose');

//Schedule Schema
var scheduleSchema = mongoose.Schema({
	date:String,
	place:String,
	direction:String,
	link:String,
	sysdate:String
});


var Schedule = module.exports = mongoose.model('Schedule',scheduleSchema);


//Fetch all Schedule
module.exports.getSchedule = function(callback,limit){
	Schedule.find(callback).limit(limit);
}

module.exports.insertSchedule  = function(newSchedule , callback){
	newSchedule.save(callback);
}

module.exports.getScheduleById = function(link,callback){
	Schedule.findOne(link,callback);
}


module.exports.updateSchedule  = function(idLink,updatedSchedule , callback){
	place = updatedSchedule.place;
	sysdate = updatedSchedule.sysdate;
	link = updatedSchedule.link;
	date = updatedSchedule.date;
	direction = updatedSchedule.direction;
	Schedule.findByIdAndUpdate(
		idLink,
		{$set:{direction:direction,place:place,sysdate:sysdate,date:date,link:link}},
		{safe:true,upsert:true},
		callback
	);
}

module.exports.deleteSchedule  = function(link,callback){
	Schedule.remove(link,callback);
}
