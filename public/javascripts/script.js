$(document).ready(function(){
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#scrollToTop']").on('click', function(event) {

  // Make sure this.hash has a value before overriding default behavior
  if (this.hash !== "") {

    // Prevent default anchor click behavior
    event.preventDefault();

    // Store hash
    var hash = this.hash;

    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 900, function(){

      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
      });
    } // End if 
  });

  $('.removeBachan').click(function(e){
    deleteId = $(this).data('id');
    $.ajax({
      url:'/admin/bachan/delete/'+ deleteId,
      type: 'DELETE',
      success:function(){
      }
    });
    window.location = '/admin/bachan/';
  });

  $('.removeSimran').click(function(e){
    deleteId = $(this).data('id');
    $.ajax({
      url:'/admin/simran/delete/'+ deleteId,
      type: 'DELETE',
      success:function(){
      }
    });
    window.location = '/admin/simran/';
  });

  $('.removeDownload').click(function(e){
    deleteId = $(this).data('id');
    $.ajax({
      url:'/admin/download/delete/'+ deleteId,
      type: 'DELETE',
      success:function(){
      }
    });
    window.location = '/admin/download/';
  });

    $('.removeQuote').click(function(e){
    deleteId = $(this).data('id');
    $.ajax({
      url:'/admin/quote/delete/'+ deleteId,
      type: 'DELETE',
      success:function(){
      }
    });
    window.location = '/admin/quote/';
  });

    $('.removeKatha').click(function(e){
    deleteId = $(this).data('id');
    $.ajax({
      url:'/admin/katha/delete/'+ deleteId,
      type: 'DELETE',
      success:function(){
      }
    });
    window.location = '/admin/katha/';
  });

  $('.removeSchedule').click(function(e){
    deleteId = $(this).data('id');
    $.ajax({
      url:'/admin/schedule/delete/'+ deleteId,
      type: 'DELETE',
      success:function(){
      }
    });
    window.location = '/admin/schedule/';
  });

  $('.removeviewKatha').click(function(e){
    deleteId = $(this).data('id');
    $.ajax({
      url:'/admin/viewKatha/delete/'+ deleteId,
      type: 'DELETE',
      success:function(){
      }
    });
    window.location = '/admin/viewKatha/';
  });

  $('.removeviewImage').click(function(e){
    console.log("I m here in Script>JS");
    deleteId = $(this).data('id');
    $.ajax({
      url:'/admin/img/delete/'+ deleteId,
      type: 'DELETE',
      success:function(){
      }
    });
    // window.location = '/admin/img/';
  });
});





