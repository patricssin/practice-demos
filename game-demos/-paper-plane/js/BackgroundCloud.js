(function(){
	var Cloud = window.Cloud = function(){
		this.image = game.res["cloud"];
		this.x = 0;
	}

	Cloud.prototype.render = function(){
		game.ctx.drawImage(this.image, this.x, game.canvas.height - 101);
		game.ctx.drawImage(this.image, this.x + 417, game.canvas.height - 101);
	}

	Cloud.prototype.update = function(){
		this.x--;
		if(this.x<-417){
			this.x = 0;
		}
	}
})()