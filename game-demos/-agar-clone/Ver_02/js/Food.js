(function(){
	var Food = window.Food = function(){
		this.x = parseInt(Math.random() * 1500);
		this.y = parseInt(Math.random() * 1000);

		do{
			this.speedX = ~~(Math.random() * 10) - 5;
			this.speedY = ~~(Math.random() * 10) - 5;
		}while(this.speedX == 0 && this.speedY == 0)



		// this.foodMass = 1;
		this.foodMass = ~~(Math.random() * 80) + 1;
		this.r = ~~(Math.sqrt(this.foodMass)) * 6 + 4;
		this.init();
		game.foodArr.push(this);
	}

	Food.prototype.init = function(){
		
		this.color = game.global.foodColor[parseInt(Math.random()*game.global.foodColor.length)];
		game.ctx.save();
		game.ctx.strokeStyle = this.color;
		game.ctx.fillStyle = this.color;
		game.drawCircle(this.x, this.y, this.r, 10);

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

		this.x += this.speedX;
		this.y += this.speedY;

		if(this.x < 0 || this.x > game.canvas.width ){
			this.speedX = -this.speedX;
		}
		if(this.y < 0 || this.y > game.canvas.height){
			this.speedY = -this.speedY;
		}

		for(var i = 0; i < game.foodArr.length; i++){
			for(var j = 0; j < game.playerArr.length; j++){
				if(this.checkCrush(game.foodArr[i], game.playerArr[j])){
					//加一层判断如果没有吃食物前是无敌的，可以随便吃，但是吃了一个食物之后就要按规则吃
					if(game.scene.player.wudi){
						game.scene.player.wudi = false;
						game.scene.player.playerMass += game.foodArr[i].foodMass / 10;
						game.scene.player.cells.push(game.foodArr[i]);
						console.log(game.scene.player.cells)
						//从数组中删除掉被吃掉的food
						game.foodArr.splice(i,1);

						game.scene.food = new Food();
					}else{
						//如果发生碰撞，再进行质量的判断
						if(game.foodArr[i].foodMass > game.playerArr[j].playerMass){
							// alert("Game Over");
							game.scene.init(3);
							game.scene.sceneNum = 3;
						}else{
							//player的质量增加相应只掉的食物
							game.scene.player.wudi = false;
							game.scene.player.playerMass += game.foodArr[i].foodMass;
							game.scene.player.cells.push(game.foodArr[i]);
							console.log(game.scene.player.cells)
							//从数组中删除掉被吃掉的food
							game.foodArr.splice(i,1);

							game.scene.food = new Food();
						}
					}
					
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