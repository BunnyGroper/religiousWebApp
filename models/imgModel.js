var mongoose = require('mongoose');

//Bachan Schema
var imageSchema = mongoose.Schema({
	name:String,
	date:String
});


var Image = module.exports = mongoose.model('Image',imageSchema);


//Fetch all Images
module.exports.getImages = function(callback,limit){
	Image.find(callback).limit(limit);
}

module.exports.insertImage = function(newImg, callback){
	newImg.save(callback);
}


module.exports.deleteImg = function(link,callback){
	Image.remove(link,callback);
}
