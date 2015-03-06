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

	$('#cancelEvent').click(function(e) {
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

	$('#addToMyLife').click(function(e) {
		console.log('DOING SOMETHING');
		// Prevent following the link
		e.preventDefault();

		// Get the div ID, e.g., "project3"
		var idNumber = $(this).closest('.event').attr('id');
		console.log(idNumber);

		// get rid of 'project' from the front of the id 'project3'
		var eventID = idNumber.substr('event'.length);
		console.log(idNumber);

		$.post('/takeAwalk/'+ eventID, function() {
			window.location.href='/takeAwalk';
		});
	});

	$('#removeFromMyLife').click(function(e) {
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
}