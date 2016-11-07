var mongoose = require('mongoose');

//Quote Schema
var quoteSchema = mongoose.Schema({
	phrase:String,
	date:String
});


var Quote = module.exports = mongoose.model('Quote',quoteSchema);


//Fetch all Quotes
module.exports.getQuotes = function(callback,limit){
	Quote.find(callback).limit(limit);
}



module.exports.insertQuote = function(newQuote, callback){
	newQuote.save(callback);
}

module.exports.getQuoteById = function(link,callback){
	Quote.findOne(link,callback);
}


module.exports.updateQuote = function(link,updatedQuote, callback){
	phrase = updatedQuote.phrase;
	date = updatedQuote.date;
	Quote.findByIdAndUpdate(
		link,
		{$set:{phrase:phrase,date:date}},
		{safe:true,upsert:true},
		callback
	);
}

module.exports.deleteQuote = function(link,callback){
	Quote.remove(link,callback);
}



