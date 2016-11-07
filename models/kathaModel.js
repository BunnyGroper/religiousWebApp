var mongoose = require('mongoose');

//Katha Schema
var kathaSchema = mongoose.Schema({
	shabad_p:String,
	shabad_h:String,
	shabad_pe:String,
	meaning_e:String,
	download_link:String,
	ang:String,
	date:String,
	place:String
});


var Katha = module.exports = mongoose.model('Katha',kathaSchema);


//Fetch all Katha
module.exports.getKatha = function(callback,limit){
	Katha.find(callback).limit(limit);
}


module.exports.insertKatha = function(newKatha, callback){
	newKatha.save(callback);
}


module.exports.getKathaById = function(link,callback){
	Katha.findOne(link,callback);
}


module.exports.updateKatha = function(link,updatedKatha, callback){
	shabad_p = updatedKatha.shabad_p;
	shabad_h = updatedKatha.shabad_h;
	shabad_pe = updatedKatha.shabad_pe;
	meaning_e = updatedKatha.meaning_e;
	ang = updatedKatha.ang;
	place = updatedKatha.place;
	download_link = updatedKatha.download_link;
	date = updatedKatha.date;
	Katha.findByIdAndUpdate(
		link,
		{$set:{meaning_e:meaning_e,shabad_pe:shabad_pe,shabad_h:shabad_h,shabad_p:shabad_p,ang:ang,place:place,date:date,download_link:download_link}},
		{safe:true,upsert:true},
		callback
	);
}

module.exports.deleteKatha = function(link,callback){
	Katha.remove(link,callback);
}
