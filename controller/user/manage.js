// 'use strict';

// // for bachan Model
// var Bachan = require('../models/bachanModel');

// // for Simran Model
// var Simran = require('../models/simranModel');

// // for Download Model
// var Download = require('../models/downloadModel');

// // for Quote Model
// var Quote = require('../models/quotesModel');

// // for Contact Information Model
// var Contactinfo = require('../models/contactModel');

// // for Katha Model

// var Katha = require('../models/kathaModel');


// // for Youtube Katha Model

// var Kathavideo = require('../models/youtubeModel');

// // for Schedule Model

// var Schedule = require('../models/scheduleModel');


// module.exports = function (router) {

//     router.get('/', function (req, res) {  
     
//      res.render('manage/index'); 
//     });


// // Amolak-Bachan Begins

//     router.get('/amolakBachan', function (req, res) {  
     
//      Bachan.find({},function(err,bachans){
//          if(err){
//              console.log(err);
//          }

//          var model = {
//              bachans:bachans
//          }
//          // console.log(model);
//          res.render('manage/aBachan/index',model); 
//         });
//     });


//     router.get('/amolakBachan/add', function (req, res) {  
//      res.render('manage/aBachan/add'); 
//     });

//     router.post('/amolakBachan/add', function (req, res) {  
     
//         var title = req.body.title && req.body.title.trim();
//         var place = req.body.place && req.body.place.trim();
//         var duration = req.body.duration && req.body.duration.trim();
//         var downloadLink = req.body.downloadLink && req.body.downloadLink.trim();

//        // console.log("I am fetching date from client : " + date);
//        if(title == '' || date == '' || place == '' || duration == '' || downloadLink == ''){
//             // req.flash('error',"Please fill out required fields");
//             res.location('/manage/amolakBachan/add');
//             res.redirect('/manage/amolakBachan/add');
//         }

//         var date =  new Date();

//         var newBachan =  new Bachan({
//             title :title,
//             date:date,
//             place:place,
//             duration:duration,
//             download_link:downloadLink
//         });
        
//         // console.log("newBachan === " + newBachan);

//         newBachan.save(function(err){
//             if(err){
//                 console.log('save error',err);
//             }
//             // req.flash('success','Book Added');
//             res.location('/manage/amolakBachan');
//             res.redirect('/manage/amolakBachan');
//         });     
//     });

//     router.get('/amolakBachan/edit/:id', function (req, res) {   
//             Bachan.findOne({_id:req.params.id},function(err,bachans){
//                 if(err){
//                     console.log(err);
//                 }
//                 var model = {
//                     bachans:bachans
//                  }
//                 // console.log(model);
//                res.render('manage/aBachan/edit',model); 
//             });         
//     }); 

//     router.post('/amolakBachan/edit/:id',function(req,res){
        
//         var title = req.body.title && req.body.title.trim();
//         var place = req.body.place && req.body.place.trim();
//         var duration = req.body.duration && req.body.duration.trim();
//         var downloadLink = req.body.downloadLink && req.body.downloadLink.trim();
//         var date =  new Date();

//         Bachan.update({_id:req.params.id},{
//             title :title,
//             date:date,
//             place:place,
//             duration:duration,
//             download_link:downloadLink           
//         },function(err){
//             if(err){
//                 console.log('update error',err);
//             }
//             // req.flash('success','Book Added');
//             res.location('/manage/amolakBachan');
//             res.redirect('/manage/amolakBachan');
//         });
//     });


//     router.delete('/amolakBachan/delete/:id',function(req,res){
//         Bachan.remove({_id:req.params.id},function(err){
//             if(err){
//                 console.log(err);
//             }
//             // req.flash('success',"Book Deleted");
//             res.location('/manage/amolakBachan');
//             res.redirect('/manage/amolakBachan');
//         });
//      });
// // Amolak Bachan Ends



// // SIMRAN Begins

//     router.get('/simran', function (req, res) {  
//         Simran.find({},function(err,simrans){
//          if(err){
//              console.log(err);
//          }

//          var model = {
//              simrans:simrans
//          }
//          // console.log(model);      
//             res.render('manage/simran/index',model);
//         }); 
//     });

//     router.get('/simran/add', function (req, res) {  
//      res.render('manage/simran/add'); 
//     });

//     router.post('/simran/add', function (req, res) {  
//         var title = req.body.title && req.body.title.trim();
//         var duration = req.body.duration && req.body.duration.trim();
//         var downloadLink = req.body.downloadLink && req.body.downloadLink.trim();
//         var date =  new Date();
//        // console.log("I am fetching date from client : " + date);
//        if(title == '' ||  duration == '' || downloadLink == ''){
//             // req.flash('error',"Please fill out required fields");
//             res.location('/manage/simran/add');
//             res.redirect('/manage/simran/add');
//         }

//         var newSimran =  new Simran({
//             title :title,
//             date:date,
//             duration:duration,
//             download_link:downloadLink
//         });
        
//         console.log("newSimran === " + newSimran);

//         newSimran.save(function(err){
//             if(err){
//                 console.log('save error',err);
//             }
//             // req.flash('success','Book Added');
//             res.location('/manage/simran');
//             res.redirect('/manage/simran');
//         });      
//     });

//     router.get('/simran/edit/:id', function (req, res) {  
//      Simran.findOne({_id:req.params.id},function(err,simrans){
//                 if(err){
//                     console.log(err);
//                 }
//                 var model = {
//                     simrans:simrans
//                  }
//                 console.log(model);
//                res.render('manage/simran/edit',model); 
//             }); 
//     });

//     router.post('/simran/edit/:id', function (req, res) {  
//         var title = req.body.title && req.body.title.trim();
//         var duration = req.body.duration && req.body.duration.trim();
//         var downloadLink = req.body.downloadLink && req.body.downloadLink.trim();
//         var date =  new Date();
//         Simran.update({_id:req.params.id},{
//             title :title,
//             date:date,
//             duration:duration,
//             download_link:downloadLink           
//         },function(err){
//             if(err){
//                 console.log('update error',err);
//             }
//             // req.flash('success','Book Added');
//             res.location('/manage/simran');
//             res.redirect('/manage/simran');
//         });
//     }); 

//     router.delete('/simran/delete/:id',function(req,res){
//         Simran.remove({_id:req.params.id},function(err){
//             if(err){
//                 console.log(err);
//             }
//             // req.flash('success',"Book Deleted");
//             res.location('/manage/simran');
//             res.redirect('/manage/simran');
//         });
//      });
// // SIMRAN Ends



// // DOWNLOAD SECTION BEGINS


//     router.get('/download', function (req, res) {  
//         Download.find({},function(err,download){
//          if(err){
//              console.log(err);
//          }

//          var model = {
//              download:download
//          }
//          // console.log(model);      
//             res.render('manage/download/index',model);
//         }); 
//     });

//     router.get('/download/add', function (req, res) {  
//      res.render('manage/download/add'); 
//     });

//     router.post('/download/add', function (req, res) {  
//         var title = req.body.title && req.body.title.trim();
//         var duration = req.body.duration && req.body.duration.trim();
//         var downloadLink = req.body.downloadLink && req.body.downloadLink.trim();
//         var date =  new Date();
//        // console.log("I am fetching date from client : " + date);
//        if(title == '' ||  duration == '' || downloadLink == ''){
//             // req.flash('error',"Please fill out required fields");
//             res.location('/manage/download/add');
//             res.redirect('/manage/download/add');
//         }

//         var newDownload =  new Download({
//             title :title,
//             date:date,
//             duration:duration,
//             download_link:downloadLink
//         });
        
//         // console.log("newBachan === " + newBachan);

//         newDownload.save(function(err){
//             if(err){
//                 console.log('save error',err);
//             }
//             // req.flash('success','Book Added');
//             res.location('/manage/download');
//             res.redirect('/manage/download');
//         });      
//     });

//     router.get('/download/edit/:id', function (req, res) {  
//      Download.findOne({_id:req.params.id},function(err,download){
//                 if(err){
//                     console.log(err);
//                 }
//                 var model = {
//                     download:download
//                  }
//                 console.log(model);
//                res.render('manage/download/edit',model); 
//             }); 
//     });

//     router.post('/download/edit/:id', function (req, res) {  
//         var title = req.body.title && req.body.title.trim();
//         var duration = req.body.duration && req.body.duration.trim();
//         var downloadLink = req.body.downloadLink && req.body.downloadLink.trim();
//         var date =  new Date();
//         Download.update({_id:req.params.id},{
//             title :title,
//             date:date,
//             duration:duration,
//             download_link:downloadLink           
//         },function(err){
//             if(err){
//                 console.log('update error',err);
//             }
//             // req.flash('success','Book Added');
//             res.location('/manage/download');
//             res.redirect('/manage/download');
//         });
//     }); 

//     router.delete('/download/delete/:id',function(req,res){
//         Download.remove({_id:req.params.id},function(err){
//             if(err){
//                 console.log(err);
//             }
//             // req.flash('success',"Book Deleted");
//             res.location('/manage/download');
//             res.redirect('/manage/download');
//         });
//      });
// // DOWNLOAD SECTION END


// // QUOTE SECTION BEGIN

//     router.get('/gurbaniQuotes', function (req, res) {  
//         Quote.find({},function(err,quote){
//          if(err){
//              console.log(err);
//          }

//          var model = {
//              quote:quote
//          }
//          console.log(model);      
//             res.render('manage/quotes/index',model);
//         }); 
//     });

//     router.get('/quotes/add', function (req, res) {  
//      res.render('manage/quotes/add'); 
//     });

//     router.post('/quotes/add', function (req, res) {  
//         var title = req.body.title && req.body.title.trim();

//        // console.log("I am fetching date from client : " + date);
//        if(title == ''){
//             // req.flash('error',"Please fill out required fields");
//             res.location('/manage/quotes/add');
//             res.redirect('/manage/quotes/add');
//         }
//          var date = new Date();
//         var newQuote =  new Quote({
//             phrase :title,
//             date: date
//         });
        
//         // console.log("newBachan === " + newBachan);

//         newQuote.save(function(err){
//             if(err){
//                 console.log('save error',err);
//             }
//             // req.flash('success','Book Added');
//             res.location('/manage/gurbaniQuotes');
//             res.redirect('/manage/gurbaniQuotes');
//         });      
//     });

//     router.get('/quotes/edit/:id', function (req, res) {  
//      Quote.findOne({_id:req.params.id},function(err,quote){
//                 if(err){
//                     console.log(err);
//                 }
//                 var model = {
//                     quote:quote
//                  }
//                 console.log(model);
//                res.render('manage/quotes/edit',model); 
//             }); 
//     });

//     router.post('/quotes/edit/:id', function (req, res) {  
//         var title = req.body.title && req.body.title.trim();
//         var date = new Date();
//         Quote.update({_id:req.params.id},{
//             phrase :title,
//             date: date
//         },function(err){
//             if(err){
//                 console.log('update error',err);
//             }
//             // req.flash('success','Book Added');
//             res.location('/manage/gurbaniQuotes');
//             res.redirect('/manage/gurbaniQuotes');
//         });
//     }); 

//     router.delete('/quotes/delete/:id',function(req,res){
//         Quote.remove({_id:req.params.id},function(err){
//             if(err){
//                 console.log(err);
//             }
//             // req.flash('success',"Book Deleted");
//             res.location('/manage/gurbaniQuotes');
//             res.redirect('/manage/gurbaniQuotes');
//         });
//      });
// // QUOTE SECTION END



// // KATHA SECTION BEGIN

//     router.get('/kathas', function (req, res) {  
//         Katha.find({},function(err,kathas){
//          if(err){
//              console.log(err);
//          }

//          var model = {
//              kathas:kathas
//          }
//          // console.log(model);      
//             res.render('manage/kathas/index',model);
//         }); 
//     });

//     router.get('/kathas/add', function (req, res) {  
//      res.render('manage/kathas/add'); 
//     });

//     router.post('/kathas/add', function (req, res) {  
//         var shabad_p = req.body.shabad_p && req.body.shabad_p.trim();
//         var shabad_h = req.body.shabad_h && req.body.shabad_h.trim();
//         var shabad_pe = req.body.shabad_pe && req.body.shabad_pe.trim();
//         var meaning_e = req.body.meaning_e && req.body.meaning_e.trim();
//         var download_link = req.body.download_link && req.body.download_link.trim();
//         var ang = req.body.ang && req.body.ang.trim();
//         var place = req.body.place && req.body.place.trim();

//        // console.log("I am fetching date from client : " + date);
//        if(shabad_p == '' || shabad_h == '' || shabad_pe == '' || meaning_e =='' || download_link == '' || ang == '' || date == '' || place ==''){
//             // req.flash('error',"Please fill out required fields");
//             res.location('/manage/kathas/add');
//             res.redirect('/manage/kathas/add');
//         }
//         var date = new Date();
//         var newKatha =  new Katha({
//             shabad_p:shabad_p,
//             shabad_h: shabad_h,
//             shabad_pe:shabad_pe,
//             meaning_e:meaning_e,
//             download_link:download_link,
//             ang:ang,
//             date:date,
//             place:place
//         });
        
//         console.log("newKatha === " + newKatha);

//         newKatha.save(function(err){
//             if(err){
//                 console.log('save error',err);
//             }
//             // req.flash('success','Book Added');
//             res.location('/manage/kathas');
//             res.redirect('/manage/kathas');
//         });      
//     });

//     router.get('/kathas/edit/:id', function (req, res) {  
//      Katha.findOne({_id:req.params.id},function(err,kathas){
//                 if(err){
//                     console.log(err);
//                 }
//                 var model = {
//                     kathas:kathas
//                  }
//                 console.log(model);
//                res.render('manage/kathas/edit',model); 
//             }); 
//     });

//     router.post('/kathas/edit/:id', function (req, res) {  
//         var shabad_p = req.body.shabad_p && req.body.shabad_p.trim();
//         var shabad_h = req.body.shabad_h && req.body.shabad_h.trim();
//         var shabad_pe = req.body.shabad_pe && req.body.shabad_pe.trim();
//         var meaning_e = req.body.meaning_e && req.body.meaning_e.trim();
//         var download_link = req.body.download_link && req.body.download_link.trim();
//         var ang = req.body.ang && req.body.ang.trim();
//         var date = new Date();
//         var place = req.body.place && req.body.place.trim();
//         Katha.update({_id:req.params.id},{
//             shabad_p:shabad_p,
//             shabad_h: shabad_h,
//             shabad_pe:shabad_pe,
//             meaning_e:meaning_e,
//             download_link:download_link,
//             ang:ang,
//             date:date,
//             place:place
//         },function(err){
//             if(err){
//                 console.log('update error',err);
//             }
//             // req.flash('success','Book Added');
//             res.location('/manage/kathas');
//             res.redirect('/manage/kathas');
//         });
//     }); 

//     router.delete('/kathas/delete/:id',function(req,res){
//         Katha.remove({_id:req.params.id},function(err){
//             if(err){
//                 console.log(err);
//             }
//             // req.flash('success',"Book Deleted");
//             res.location('/manage/kathas');
//             res.redirect('/manage/kathas');
//         });
//      });
// // KATHA SECTION ENDS



// // CONTACT-US BEGIN

//     router.get('/contactUs', function (req, res) {  
     
//         Contactinfo.find({},function(err,information){
//          if(err){
//              console.log(err);
//          }

//          var model = {
//              information:information
//          }
//          console.log(model);      
//             res.render('manage/contactUs/index',model);
//         }); 
//     });
// //CONTACT-US ENDS 



// // KATHA FROM YOUTUBE SECTION BEGIN


//     router.get('/kathasYoutube', function (req, res) {  
//         Kathavideo.find({},function(err,videos){
//          if(err){
//              console.log(err);
//          }

//          var model = {
//              videos:videos
//          }
//          // console.log(model);      
//             res.render('manage/kathasYoutube/index',model);
//         }); 
//     });

//     router.get('/kathasYoutube/add', function (req, res) {  
//      res.render('manage/kathasYoutube/add'); 
//     });

//     router.post('/kathasYoutube/add', function (req, res) {  
//         var title = req.body.title && req.body.title.trim();
//         var link = req.body.link && req.body.link.trim();
//         var date = new Date();
//        // console.log("I am fetching date from client : " + date);
//        if(title == '' || link == ''){
//             // req.flash('error',"Please fill out required fields");
//             res.location('/manage/kathasYoutube/add');
//             res.redirect('/manage/kathasYoutube/add');
//         }
        
//         var newKathavideo =  new Kathavideo({
//             title: title,
//             link : link,
//             date : date
//         });
        
//         // console.log("Kathavideo === " + Kathavideo);

//         newKathavideo.save(function(err){
//             if(err){
//                 console.log('save error',err);
//             }
//             // req.flash('success','Book Added');
//             res.location('/manage/kathasYoutube');
//             res.redirect('/manage/kathasYoutube');
//         });      
//     });

//     router.get('/kathasYoutube/edit/:id', function (req, res) {  
//      Kathavideo.findOne({_id:req.params.id},function(err,videos){
//                 if(err){
//                     console.log(err);
//                 }
//                 var model = {
//                     videos:videos
//                  }
//                 console.log(model);
//                res.render('manage/kathasYoutube/edit',model); 
//             }); 
//     });

//     router.post('/kathasYoutube/edit/:id', function (req, res) {  
//         var title = req.body.title && req.body.title.trim();
//         var link = req.body.link && req.body.link.trim();
//         var date = new Date();
//        // console.log("I am fetching date from client : " + date);
//        if(title == '' || link == ''){
//             // req.flash('error',"Please fill out required fields");
//             res.location('/manage/kathasYoutube/edit');
//             res.redirect('/manage/kathasYoutube/edit');
//         }

//         Kathavideo.update({_id:req.params.id},{
//             title:title,
//             link:link,
//             date:date
//         },function(err){
//             if(err){
//                 console.log('update error',err);
//             }
//             // req.flash('success','Book Added');
//             res.location('/manage/kathasYoutube');
//             res.redirect('/manage/kathasYoutube');
//         });
//     }); 

//     router.delete('/kathasYoutube/delete/:id',function(req,res){
//         Kathavideo.remove({_id:req.params.id},function(err){
//             if(err){
//                 console.log(err);
//             }
//             // req.flash('success',"Book Deleted");
//             res.location('/manage/kathasYoutube');
//             res.redirect('/manage/kathasYoutube');
//         });
//      });

   
// // KATHA FROM YOUTUBE SECTION BEGIN

 
// //SCHEDULE SECTION BEGIN




//  router.get('/schedule', function (req, res) {  
//         Schedule.find({},function(err,schedule){
//          if(err){
//              console.log(err);
//          }

//          var model = {
//              schedule:schedule
//          }
//          // console.log(model);      
//             res.render('manage/schedule/index',model);
//         }); 
//     });

//     router.get('/Schedule/add', function (req, res) {  
//      res.render('manage/schedule/add'); 
//     });

//     router.post('/Schedule/add', function (req, res) {  
//         var direction = req.body.direction && req.body.direction.trim();
//         var place = req.body.place && req.body.place.trim();
//         var date = req.body.date && req.body.date.trim();
//         var link = req.body.link && req.body.link.trim();
//         var sysdate = new Date();
//        // console.log("I am fetching date from client : " + date);
//        if(place == '' || link == '' || direction =='' || date ==''|| link =='' || sysdate == ''){
//             // req.flash('error',"Please fill out required fields");
//             res.location('/manage/Schedule/add');
//             res.redirect('/manage/Schedule/add');
//         }
        
//         var newSchedule =  new Schedule({
//             place:place,
//             direction:direction,
//             link : link,
//             date : date,
//             sysdate :sysdate
//         });
        
        
//         newSchedule.save(function(err){
//             if(err){
//                 console.log('save error',err);
//             }
//             // req.flash('success','Book Added');
//             res.location('/manage/Schedule');
//             res.redirect('/manage/Schedule');
//         });      
//     });

//     router.get('/Schedule/edit/:id', function (req, res) {  
//      Schedule.findOne({_id:req.params.id},function(err,schedule){
//                 if(err){
//                     console.log(err);
//                 }
//                 var model = {
//                     schedule:schedule
//                  }
//                 console.log(model);
//                res.render('manage/schedule/edit',model); 
//             }); 
//     });

//     router.post('/Schedule/edit/:id', function (req, res) {  
//         var direction = req.body.direction && req.body.direction.trim();
//         var place = req.body.place && req.body.place.trim();
//         var date = req.body.date && req.body.date.trim();
//         var link = req.body.link && req.body.link.trim();
//         var sysdate = new Date();
//        // console.log("I am fetching date from client : " + date);
//        if(place == '' || link == '' || direction =='' || date ==''|| link =='' || sysdate == ''){
//             // req.flash('error',"Please fill out required fields");
//             res.location('/manage/Schedule/add');
//             res.redirect('/manage/Schedule/add');
//         }
//         Schedule.update({_id:req.params.id},{
//             place:place,
//             direction:direction,
//             link : link,
//             date : date,
//             sysdate :sysdate
//         },function(err){
//             if(err){
//                 console.log('update error',err);
//             }
//             // req.flash('success','Book Added');
//             res.location('/manage/Schedule');
//             res.redirect('/manage/Schedule');
//         });
//     }); 

//     router.delete('/Schedule/delete/:id',function(req,res){
//         Schedule.remove({_id:req.params.id},function(err){
//             if(err){
//                 console.log(err);
//             }
//             // req.flash('success',"Book Deleted");
//             res.location('/manage/Schedule');
//             res.redirect('/manage/Schedule');
//         });
//      });


// //SCHEDULE SECTION ENDS
// };



