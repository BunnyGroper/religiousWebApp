var mongoose = require('mongoose');

//ViewKatha Schema
var KathaVideoSchema = mongoose.Schema({
	title:String,
	link:String,
	date:String
});


var KathaVideo = module.exports = mongoose.model('KathaVideo',KathaVideoSchema);


//Fetch all Katha Video
module.exports.getKathaVideo = function(callback,limit){
	KathaVideo.find(callback).limit(limit);
}

module.exports.insertKatha = function(newKatha, callback){
	newKatha.save(callback);
}

module.exports.getKathaVideoById = function(link,callback){
	KathaVideo.findOne(link,callback);
}

module.exports.updateKathaVideo = function(linkMongo,newviewKatha, callback){
	title = newviewKatha.title;
	link = newviewKatha.link;
	date = newviewKatha.date;
	KathaVideo.findByIdAndUpdate(
		linkMongo,
		{$set:{title:title,date:date,link:link}},
		{safe:true,upsert:true},
		callback
	);
}

module.exports.deleteKathaVideo = function(link,callback){
	KathaVideo.remove(link,callback);
}
