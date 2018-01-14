(function(){
	var Food = window.Food = function(){
		while(true){
			this.row = parseInt(Math.random() * 15);
			this.col = parseInt(Math.random() * 15);
			
			for(var i = 0; i < game.snake.body.length; i++){
				if(game.snake.body[i].row == this.row && game.snake.body[i].col == this.col){
					break;
				}
			}

			if(i == game.snake.body.length){
				break;
			}
		}

		game.changeHtml(this.row, this.col, "🌲");
	}

	Food.prototype.check = function(){
		if(this.row == game.snake.body[0].row && this.col == game.snake.body[0].col){
			return true;
		}
		return false;
	}
})()