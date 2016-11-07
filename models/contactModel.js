var mongoose = require('mongoose');

//ContactInfo Schema
var ContactInfoSchema = mongoose.Schema({
	name:String,
	email:String,
	query:String,
	date:String
});


var ContactInfo = module.exports = mongoose.model('Contact',ContactInfoSchema);


// Fetch all ContactInfo

module.exports.insertContact = function(newContactInfo, callback){
	newContactInfo.save(callback);
}

module.exports.getContactInfo = function(callback,limit){
	ContactInfo.find(callback).limit(limit);
}



