
var banner = function(){
	
}

banner.prototype = {
	init : function(){
		var width = $(window).width();
		var height = $(window).height();

		console.log(width, height);

		this.app = new PIXI.Application(width, height, {transparent : true});
		//app.renderer.backgroundColor = 0xFFFFFF;

		this.app.view.style.position = 'absolute';
		this.app.view.style.top = '0';
		this.app.view.style.left = '0';
		document.body.appendChild(this.app.view);

		this.build();
	},

	build : function(){
		console.log("build");

		var width = $(window).width();
		var height = $(window).height();

		this.app.renderer.resize(width, height);

		if(!this.texture) this.texture = PIXI.Texture.fromImage('media/img/texture/bg_intro.jpg');
		if(!this.texture2) this.texture2= PIXI.Texture.fromImage('media/img/texture/checker_plus.png');
		
		//var sprite = new PIXI.Sprite(texture);

		this.bg = new PIXI.Graphics();
		this.bg.beginFill(0x53CBF4);
		this.bg.drawRect(0,0, width, height);
		this.bg.endFill();

		this.container = new PIXI.Container();

		//sprite.scale.x = 2;
		//sprite.scale.y = 2;

		this.app.stage.addChild(this.bg);
		//this.container.scale.set(2,2);

		this.bgTiles = [];

		for (var i = 0; i < Math.ceil(width / 512); i++) {
			for (var j = 0; j < Math.ceil(height / 512); j++) {
				var overlay = new PIXI.Sprite(this.texture2);
				overlay.scale.set(2,2);
				overlay.x = i * 512 * 2;
				overlay.y = j * 512 * 2;

				this.bgTiles.push(overlay);
				this.container.addChild(overlay)
			};
		};

		this.app.stage.addChild(this.container);

		
		

		this.shockwave = new PIXI.filters.ShockwaveFilter();
		//shockwave.size.set(4,4);
		this.shockwave.time = 0;

		var viewCenter = new PIXI.Point(width / 2, height / 2);
		this.shockwave.center[0] = viewCenter.x / this.container.width;
		this.shockwave.center[1] = viewCenter.y / this.container.height;


		this.bloom = new PIXI.filters.BloomFilter();
		this.bloom.blur = 5;

		this.container.filters = [this.shockwave];



		this.timeline1 = new TimelineMax({});
		this.timeline2 = new TimelineMax({});

		//timeline.to(sprite.scale, 15,  {"x" : 2, "y" : 2, "repeat" : -1, "yoyo" : true, "ease" :  Linear.easeInOut});
		this.timeline1.add(TweenMax.to(this.shockwave, 5, {time : 1, repeat : -1}))
		this.timeline2.add(TweenMax.to(this.container, 20,  {"x" : "-=500", "y" : "-=500", "repeat" : -1, "yoyo" : true, "ease" :  Linear.easeInOut}));
		
	},

	deconstruct : function(){
		console.log("deconstruct");

		TweenMax.killAll();

		this.timeline1 = this.timeline2 = null;

		this.bgTiles.forEach( function(element, index) {
			element.destroy();
		});

		this.bgTiles.length = 0;

		this.container.removeChildren();
		this.container.destroy();
		this.bg.destroy();

		this.container = null;
		this.bg = null;

		this.shockwave = this.bloom = null;
	},

	resize :  function(){
		console.log("resize");
		this.deconstruct();
		this.build();
	}
}

$(document).ready(
	function() {
		console.log("ready");

		var b = new banner();
		b.init();

		$(window).resize(
			function(event){
				b.resize();
			}
		)
	}
)