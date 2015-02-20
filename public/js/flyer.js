$(document).ready(function() {
	
	
	$('.removeEvent').click(function(event) {
  		//alert("clicked");
  		//AJAX_JSON_Req( '../myEvents.json' );
  		$(this).parents('.row').remove();
	});
	$('.addEvent').click(function() {
  		
  		var x = $(this).parents('.caption').children("h4").text();
  		alert("Title of Event to be put into this users database for myLife: "+x);
	});
})




