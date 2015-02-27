'use strict';
//Joseph's version
/*$(document).ready(function() {
	
	
	$('.removeEvent').click(function(event) {
  		//alert("clicked");
  		//AJAX_JSON_Req( '../myEvents.json' );
  		$(this).parents('.row').remove();
	});

	$('.addEvent').click(function() {
  		
  		var x = $(this).parents('.caption').children("h4").text();
  		alert("Title of Event to be put into this users database for myLife: "+x);
	});
})*/

//Rachel's version
/*$(document).ready(function() {
	initializePage();
})
	
function initializePage() {	
	$('#newEventSubmitButton').click(function(e) {
		console.log('CREATED NEW EVENT!');
	});
}*/

/*$(document).ready(function() {
	$('#newEventSubmitButton').click(function(e) {
		//e.preventDefault();
		console.log('posted new event!');

		var title = $('#addEvent #title').val();
		var json = {
			'title': title
		};

		$.post('/post/new', json, function() {
			window.location.href = '/myPosts'; // reload the page
		});
	});
})*/

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.post a').click(function(e) {
		console.log('DOING SOMETHING');
		// Prevent following the link
		e.preventDefault();

		// Get the div ID, e.g., "project3"
		var postID = $(this).closest('.post').attr('id');
		// get rid of 'project' from the front of the id 'project3'
		var idNumber = postID.substr('post'.length);

		// this is the URL we'll call
		var url_call = '/post/'+idNumber;

		// How to respond to the GET request
		function addPostDetails(post_json) {
			// We need to compute a display string for the date
			// Search 'toLocaleDateString' online for more details.
			var date_obj = new Date(post_json['date']);
			var options = {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric"
			};
			var display_date = date_obj.toLocaleDateString('en-US', options);

			// compose the HTML
			var new_html =
				'<div class="post-date">'+display_date+'</div>'+
				'<div class="post-summary">'+post_json['summary']+'</div>'+
				'<button class="post-delete btn btn-default" '+
					'type="button">delete</button>';

			// get the DIV to add content to
			var details_div = $('#post' + idNumber + ' .details');
			// add the content to the DIV
			details_div.html(new_html);

			details_div.find('.post-delete').click(function(e) {
				$.post('/post/'+idNumber+'/delete', function() {
					window.location.href = '/myPosts';
				});
			});
		}

		// issue the GET request
		$.get(url_call, addPostDetails);
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
}