

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

		var texture = PIXI.Texture.fromImage('media/img/texture/bg_intro.jpg');
		var texture2= PIXI.Texture.fromImage('media/img/texture/checker_circle.png');
		
		//var sprite = new PIXI.Sprite(texture);

		var bg = new PIXI.Graphics();
		bg.beginFill(0xA095A0);
		bg.drawRect(0,0, width, height);
		bg.endFill();

		var container = new PIXI.Container();

		//sprite.scale.x = 2;
		//sprite.scale.y = 2;

		app.stage.addChild(bg);
		container.scale.set(2,2);

		for (var i = 0; i < Math.ceil(width / 512); i++) {
			for (var j = 0; j < Math.ceil(height / 512); j++) {
				var overlay = new PIXI.Sprite(texture2);
				overlay.x = i * 512;
				overlay.y = j * 512;
				container.addChild(overlay)
			};
		};

		app.stage.addChild(container);

		
		

		var shockwave = new PIXI.filters.ShockwaveFilter();
		//shockwave.size.set(4,4);
		shockwave.time = 0;

		var bloom = new PIXI.filters.BloomFilter();
		bloom.blur = 5;

		container.filters = [bloom];



		var timeline1 = new TimelineMax({});
		var timeline2 = new TimelineMax({});

		//timeline.to(sprite.scale, 15,  {"x" : 2, "y" : 2, "repeat" : -1, "yoyo" : true, "ease" :  Linear.easeInOut});
		//timeline1.add(TweenMax.to(shockwave, 5, {time : 1, repeat : -1}))
		timeline2.add(TweenMax.to(container, 20,  {"x" : "-=500", "y" : "-=500", "repeat" : -1, "yoyo" : true, "ease" :  Linear.easeInOut}));
		

		$(window).resize(
			function(event){
				console.log(event);
				var width = $(window).width();
				var height = $(window).height();
				app.renderer.resize(width, height)
			}
		)

	}
)