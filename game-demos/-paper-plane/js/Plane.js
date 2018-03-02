(function(){
	var Plane = window.Plane = function(){
		this.image = game.res["plane"];
		this.x = 250;
		this.y = 290;

		this.dy = 0.2;

		this.deg = 0;
	}

	Plane.prototype.render = function(){
		game.ctx.save();
		game.ctx.translate(this.x, this.y);
		game.ctx.rotate(this.deg);
		game.ctx.drawImage(this.image, -8, -9);
		game.ctx.restore();

	}

	Plane.prototype.update = function(){
		this.dy += 0.08;
		this.deg += 0.006;

		this.y += this.dy;


		this.x1 = parseInt(this.x);
		this.x2 = parseInt(this.x + 17);
		this.y1 = parseInt(this.y);
		this.y2 = parseInt(this.y + 19);

		if(this.y2 > game.canvas.height - 98){
			game.scene.sceneNum = 3;
			game.scene.init(3);
		}

	}

	Plane.prototype.fly = function(){
		this.dy = -2;
		this.deg = -0.18;
	}
})()