var mongoose = require('mongoose');

//Simran Schema
var simranSchema = mongoose.Schema({
	title:String,
	date:String,
	duration:String,
	download_link:String
});


var Simran = module.exports = mongoose.model('Simran',simranSchema);


//Fetch all Simran
module.exports.getSimran = function(callback,limit){
	Simran.find(callback).limit(limit);
}


module.exports.insertSimran = function(newSimran, callback){
	newSimran.save(callback);
}

module.exports.getSimranById = function(link,callback){
	Simran.findOne(link,callback);
}


module.exports.updateSimran = function(link,updatedSimran, callback){
	title = updatedSimran.title;
	place = updatedSimran.place;
	duration = updatedSimran.duration;
	download_link = updatedSimran.download_link;
	date = updatedSimran.date;
	Simran.findByIdAndUpdate(
		link,
		{$set:{title:title,place:place,duration:duration,date:date,download_link:download_link}},
		{safe:true,upsert:true},
		callback
	);
}

module.exports.deleteSimran = function(link,callback){
	Simran.remove(link,callback);
}

