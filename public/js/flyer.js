'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	$('#searchForm').submit(function(){});
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

	$('.cancelEvent').click(function(e) {
		// Prevent following the link
		e.preventDefault();

		// Get the div ID, e.g., "project3"
		var idNumber = $(this).closest('.event').attr('id');

		// get rid of 'project' from the front of the id 'project3'
		var eventID = idNumber.substr('event'.length);
		console.log(idNumber);

		$.post('/myPosts/' + eventID + '/delete', function() {
			window.location.href='/myPosts';
		});
	});

	$('.addToMyLife').click(function(e) {
	//$('.post a').click(function(e) {
		e.preventDefault();
		console.log('DOING SOMETHING');
		
		// Get the div ID, e.g., "project3"
		var idNumber = $(this).closest('.event').attr('id');
		console.log(idNumber);
		
		// get rid of 'project' from the front of the id 'project3'
		var eventID = idNumber.substr('event'.length);
		console.log(idNumber);

		//var details_div = $('#event' + idNumber);
		//alert(details_div);
		//details_div.find('#addToMyLife').click(function(e) {
			$.post('/takeAwalk/'+ eventID, function() {
				window.location.href='/takeAwalk';
			});
		//});
	});

	$('.removeFromMyLife').click(function(e) {
		// Prevent following the link
		e.preventDefault();

		// Get the div ID, e.g., "project3"
		var idNumber = $(this).closest('.event').attr('id');
		console.log(idNumber);

		// get rid of 'project' from the front of the id 'project3'
		var eventID = idNumber.substr('event'.length);
		console.log(idNumber);

		$.post('/myLife/'+ eventID + '/remove', function() {
			window.location.href='/myLife';
		});
	});

	$('#newEventSubmitButton').click(function(e) {
		console.log('posted new event!');

		var title = $('#addEvent #title').val();
		var json = {
			'title': title
		};

		$.post('/post/new', json, function() {
			window.location.href = '/myPosts'; // reload the page
		});
	});

	
	$('.clickedTake').click(function(){
		
		var random_num = Math.random();
		
		console.log(random_num);
		if(random_num > 0.5){
			console.log("display > .5");
			window.location.href = "/takeAwalk";
		}else{
			console.log("take a walk 2 should be rendered");
			window.location.href = "/takeAwalk2";	
			
		}
	});

	$(".version_a").click(function(){
		//add your Woopra tracking code for version A's like button click event
		event.preventDefault();
		woopra.track("a_version_add_click");
	});
	
	$(".version_b").click(function(){
		//add your Woopra tracking code for version A's like button click event
		//alert("clicked");
		event.preventDefault();
		woopra.track("b_version_add_click");
	});


}