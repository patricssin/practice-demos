(function(){
	var Background = window.Background = function(){
		this.init();
	}

	Background.prototype.init =function(){
		//绘制背景
		game.ctx.fillStyle = game.global.backgroundColor;
		game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);


		game.ctx.beginPath();
		//绘制grid
		for (var i = 0; i < game.canvas.width; i += 50){
			game.ctx.moveTo(i, 0);
			game.ctx.lineTo(i, game.canvas.height);
		}
		for (var j = 0; j < game.canvas.height; j += 50){
			game.ctx.moveTo(0, j);
			game.ctx.lineTo(game.canvas.width, j);
		}

		game.ctx.save();
		game.ctx.lineWidth = 1;
		game.ctx.globalAlpha = 0.15;
		game.ctx.stroke();
		game.ctx.restore();
	}

	Background.prototype.render = function(){
		//绘制背景
		game.ctx.fillStyle = game.global.backgroundColor;
		game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);


		game.ctx.beginPath();
		//绘制grid
		for (var i = 0; i < game.canvas.width; i += 50){
			game.ctx.moveTo(i, 0);
			game.ctx.lineTo(i, game.canvas.height);
		}
		for (var j = 0; j < game.canvas.height; j += 50){
			game.ctx.moveTo(0, j);
			game.ctx.lineTo(game.canvas.width, j);
		}

		game.ctx.save();
		game.ctx.lineWidth = 1;
		game.ctx.globalAlpha = 0.15;
		game.ctx.stroke();
		game.ctx.restore();

		//开场就有一些食物
		// for(var i = 0; i < 50; i++){
		// 	game.food.color = game.global.foodColor[parseInt(Math.random()*game.global.foodColor.length)];
		// 	game.ctx.save();
		// 	game.ctx.strokeStyle = game.food.color;
		// 	game.ctx.fillStyle = game.food.color;
		// 	this.drawCircle(game.food.x, game.food.y, 20, 10);

		// 	game.ctx.restore();
		// }
		// for(var i = 0; i < 50; i++){
		// 	game.food = new Food()
		// }
	}


})()
