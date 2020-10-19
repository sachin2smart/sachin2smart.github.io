if (typeof jQuery !== 'undefined') {
	(function($) {
		$('#spinner').ajaxStart(function() {
			$(this).fadeIn();
		}).ajaxStop(function() {
			$(this).fadeOut();
		});
	})(jQuery);
}



function redirectToFB(){
	var randomNumber = Math.random(); 
	window.open('http://www.facebook.com/sachin.shinde339?id='+randomNumber);
	return false;
}
	
function redirectToLinkedIn(){
	var randomNumber = Math.random(); 
	window.open('https://www.linkedin.com/in/mastersachin?id='+randomNumber);
	return false;
}

function redirectToInsta(){
	var randomNumber = Math.random(); 
	window.open('https://www.instagram.com/__sachin_shinde__?id='+randomNumber);
	return false;
}


function redirectToGithub(){
	var randomNumber = Math.random(); 
	window.open('https://github.com/sachin2smart?id='+randomNumber);
	return false;
}