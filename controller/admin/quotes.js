var express = require('express');
var router = express.Router();

Quote = require('../../models/quoteModel')



// Add Quote Section

router.get('/',ensureAuthenticated, function(req, res, next) {
	Quote.getQuotes(function(err,quotes){
		if(err){
			console.log(err);
		}else{
			console.log(quotes);
			res.render('./manage/auth/quotes/index',{"quotes":quotes}); 
		}
		});
});

router.get('/add',ensureAuthenticated,function(req, res, next) {
	res.render('./manage/auth/quotes/add'); 
});

router.post('/add',ensureAuthenticated,function(req,res,next){

	var phrase = req.body.phrase && req.body.phrase.trim();
    var date = new Date();

    console.log("phrase : "+ phrase);
    console.log("date : "+ date);

	// Form Validation
	req.checkBody('phrase','Phrase is required').notEmpty();

	// Check for errors
	var errors = req.validationErrors();
	if(errors){
		res.render('/admin/quote/add',{
			errors : errors,
			phrase:phrase
		});
	} else {
		var newQuote = new Quote({
			phrase:phrase,
			date:date
		});
		console.log("newQuote :" + newQuote);
		Quote.insertQuote(newQuote,function(err,quote){
			if(err) throw err;
			console.log(quote);	
		});

		//Success Message
		req.flash('success','Content Successfully Inserted');
		res.location('/admin/quote/');
		res.redirect('/admin/quote/');
	}
});



//  Edit Bachan Section
router.get('/edit/:id',ensureAuthenticated, function (req, res) {  
	Quote.getQuoteById({_id:req.params.id},function(err,quotes){
		if(err){
			console.log(err);
		}else{
			console.log(quotes);
			res.render('./manage/auth/quotes/edit',{"quotes":quotes}); 
		}
		});
	}); 

router.post('/edit/:id',ensureAuthenticated,function(req,res,next){

	var phrase =  req.body.phrase && req.body.phrase.trim();
	var date = new Date();
	var newQuote = new Quote({
		phrase:phrase,
		date:date
	});
	
	Quote.updateQuote({_id:req.params.id},newQuote,function(err,quotes){
		if(err) throw err;
		console.log("updated one : " + quotes);	
	});

	//Success Message
	req.flash('success','Content Successfully Updated');
	res.location('/admin/quote/');
	res.redirect('/admin/quote/');
	}
);


// Delete Bachan

router.delete('/delete/:id',ensureAuthenticated,function(req,res){
	Quote.deleteQuote({_id:req.params.id},function(err,quotes){
		if(err) throw err;
		});
	req.flash('success',"Content Deleted");
	res.location('/admin/quote');
	res.redirect('/admin/quote');
});



function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		
		return next();
	}
	req.flash('error','Login is required to access the required webpage !!!!!');
	res.redirect('/admin/login');
}


module.exports = router;


