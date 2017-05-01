// Definitions

var navBarControls = {

}

function onScrollLink(e){
	e.preventDefault();
	var sectionID = $(this).attr("data-id");
	console.log(this, sectionID);
	scrollToID('#' + sectionID, 750);
}

function onScrollTop(e){
	e.preventDefault();
	$('html, body').animate({scrollTop: 0}, 'slow');
}


function scrollToID(id, speed){
	var offset = 50;
	var targetOffset = $(id).offset().top - offset;
	var mainNav = $('#main-nav');
	$('html,body').animate({scrollTop:targetOffset}, speed);
	if (mainNav.hasClass("open")) {
		mainNav.css("height", "1px").removeClass("in").addClass("collapse");
		mainNav.removeClass("open");
	}
}

$(document).ready(
	function() { 
		console.log("ready 2")
		$('.scroll-link').on('click', onScrollLink);
		$('.scroll-top').on('click', onScrollTop);
	}
)