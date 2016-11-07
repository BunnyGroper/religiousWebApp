var mongoose = require('mongoose');

//Download Schema
var downloadSchema = mongoose.Schema({
	title:String,
	date:String,
	duration:String,
	download_link:String
});


var Download = module.exports = mongoose.model('Download',downloadSchema);


//Fetch all Download
module.exports.getDownload = function(callback,limit){
	Download.find(callback).limit(limit);
}



module.exports.insertDownload = function(newDownload, callback){
	newDownload.save(callback);
}

module.exports.getDownloadById = function(link,callback){
	Download.findOne(link,callback);
}


module.exports.updateDownload = function(link,updatedDownload, callback){
	title = updatedDownload.title;
	place = updatedDownload.place;
	duration = updatedDownload.duration;
	download_link = updatedDownload.download_link;
	date = updatedDownload.date;
	Download.findByIdAndUpdate(
		link,
		{$set:{title:title,place:place,duration:duration,date:date,download_link:download_link}},
		{safe:true,upsert:true},
		callback
	);
}

module.exports.deleteDownload = function(link,callback){
	Download.remove(link,callback);
}

