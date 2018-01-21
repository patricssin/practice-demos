(function(){
	var Food = window.Food = function(){
		this.x = parseInt(Math.random() * 2000);
		this.y = parseInt(Math.random() * 1200);

		// do{
		// 	this.
		// }
		this.r = 12;

		this.foodMass = 1;

		this.init();
		game.foodArr.push(this);
	}

	Food.prototype.init = function(){
		
		this.color = game.global.foodColor[parseInt(Math.random()*game.global.foodColor.length)];
		game.ctx.save();
		game.ctx.strokeStyle = this.color;
		game.ctx.fillStyle = this.color;
		game.drawCircle(this.x, this.y, 20, 10);

		game.ctx.restore();
	}

	Food.prototype.render = function(){
		game.ctx.save();
		game.ctx.strokeStyle = this.color;
		game.ctx.fillStyle = this.color;
		game.drawCircle(this.x, this.y, this.r, 10);

		game.ctx.restore();
	}

	Food.prototype.update = function(){

		for(var i = 0; i < game.foodArr.length; i++){
			for(var j = 0; j < game.playerArr.length; j++){
				if(this.checkCrush(game.foodArr[i], game.playerArr[j])){
					//player的质量增加相应只掉的食物
					game.player.wudi = false;
					game.player.playerMass += game.foodArr[i].foodMass;
					game.player.cells.push(game.foodArr[i]);
					console.log(game.player.cells)
					//从数组中删除掉被吃掉的food
					game.foodArr.splice(i,1);

					game.food = new Food();
				}else{

			}
			}
			
		}

	}

	Food.prototype.checkCrush = function(food, player){
		var diffX = food.x - player.x,
			diffY = food.y - player.y;

		var distance = Math.sqrt(diffX * diffX + diffY * diffY); 

		if(distance <= food.r + player.r){
			return true;
		}else{
			return false;
		}
	}
})()