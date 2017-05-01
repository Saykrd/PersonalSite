

$(document).ready(
	function() {
		console.log("ready 1");

		var width = $(window).width();
		var height = $(window).height();

		console.log(width, height);

		var app = new PIXI.Application(width, height, {transparent : true});
		//app.renderer.backgroundColor = 0xFFFFFF;

		app.view.style.position = 'absolute';
		app.view.style.top = '0';
		app.view.style.left = '0';
		document.body.appendChild(app.view);
	}
)