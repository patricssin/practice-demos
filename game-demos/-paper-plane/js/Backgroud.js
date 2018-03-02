(function(){
	var Background = window.Background = function(){
		// this.image = game.res["cloud"];
		this.x = 0;
	}

	Background.prototype.render = function(){
		game.ctx.save();
		// game.ctx.fillStyle = "#2189f0";  //#1281f1
		game.ctx.fillStyle = "rgb(37,114,225)";  //#1281f1
		game.ctx.fillRect(0,0,game.canvas.width,game.canvas.height - 90);
		game.ctx.restore();

		
	}

	Background.prototype.update = function(){
		this.x--;
		if(this.x<-417){
			this.x = 0;
		}
	}
})()