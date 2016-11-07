	var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


//User Schema
var userSchema = mongoose.Schema({
	username:String,
	password:String
});


var User = module.exports = mongoose.model('User',userSchema);


module.exports.comparePassword = function(candidatePassword,hash,callback){
	bcrypt.compare(candidatePassword,hash,function(err,isMatch){
		console.log('Hash : '+hash);
		console.log('candidatePassword : '+ isMatch);
		if (err) return callback(err);
		callback(null,isMatch);
	});
}

module.exports.getUserByUsername = function(username,callback){
	var query = {username:username};
	User.findOne(query,callback);
}

module.exports.getUserById = function(username,callback){
	User.findById(username,callback);
}

module.exports.createUser = function(newUser, callback){
	bcrypt.hash(newUser.password,10,function(err,hash){
		if(err) throw err;
		// Set hashed pw
		newUser.password = hash;
		//Create User
		newUser.save(callback);
	});
}