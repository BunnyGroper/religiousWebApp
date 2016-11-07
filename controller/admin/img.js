var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './public/img/gallery_img'});

Image = require('../../models/imgModel')



// Add Image 

router.get('/',ensureAuthenticated,function(req, res, next) {
	Image.getImages(function(err,images){
		if(err){
			console.log(err);
		}else{
			// console.log(images);
			res.render('./manage/auth/img/index',{"images":images}); 
		}
		});
});

router.get('/add',function(req, res, next) {
	res.render('./manage/auth/img/add'); 
});

router.post('/add',ensureAuthenticated,upload.single('mainImg'),function(req,res,next){
	
	//Get Form Values
	var date = new Date();
	var imgName 		= req.file.filename;
	// var extension = imgOriginalName.split('.').pop();
		var newImg = new Image({
			name:imgName,
			date:date
		});

		console.log("Image which is going to Upload : " + newImg);
		Image.insertImage(newImg,function(err,img){
			if(err) throw err;
			console.log("Image Added : " +img);	
		});

		//Success Message
		req.flash('success','Image Successfully Inserted');
		res.location('/admin/img/');
		res.redirect('/admin/img/');

	
});





// // Delete Bachan

router.delete('/delete/:id',ensureAuthenticated,function(req,res){
	Image.deleteImg({_id:req.params.id},function(err,img){
		if(err) throw err;

		});
	req.flash('success',"Image Deleted");
	res.location('/admin/img');
	res.redirect('/admin/img');
});



function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		
		return next();
	}
	req.flash('error','Login is required to access the required webpage !!!!!');
	res.redirect('/admin/login');
}


module.exports = router;


