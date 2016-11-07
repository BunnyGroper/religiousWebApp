var mongoose = require('mongoose');

//Bachan Schema
var bachanSchema = mongoose.Schema({
	title:String,
	place:String,
	duration:String,
	download_link:String,
	date:String
});


var Bachan = module.exports = mongoose.model('Bachan',bachanSchema);


//Fetch all Bachan
module.exports.getBachans = function(callback,limit){
	Bachan.find(callback).limit(limit);
}

module.exports.insertBachan = function(newBachan, callback){
	newBachan.save(callback);
}

module.exports.getBachanById = function(link,callback){
	Bachan.findOne(link,callback);
}


module.exports.updateBachan = function(link,updatedBachan, callback){
	title = updatedBachan.title;
	place = updatedBachan.place;
	duration = updatedBachan.duration;
	download_link = updatedBachan.download_link;
	date = updatedBachan.date;
	Bachan.findByIdAndUpdate(
		link,
		{$set:{title:title,place:place,duration:duration,date:date,download_link:download_link}},
		{safe:true,upsert:true},
		callback
	);
}

module.exports.deleteBachan = function(link,callback){
	Bachan.remove(link,callback);
}
