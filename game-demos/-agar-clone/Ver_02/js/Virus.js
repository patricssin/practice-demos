(function(){
	var Virus = window.Virus = function(){
		this.x = parseInt(Math.random() * 1000);
		this.y = parseInt(Math.random() * 1000);
		this.r = 20;
		do{
			this.speedX = ~~(Math.random() * 7) - 3;
			this.speedY = ~~(Math.random() * 7) - 3;
		}while(this.speedX == 0 && this.speedY == 0)


		this.virusMass = -5;

		this.init();
		game.virusArr.push(this);
	}

	Virus.prototype.init = function(){
		
		this.color = "#000";
		game.ctx.save();
		game.ctx.strokeStyle = this.color;
		game.ctx.fillStyle = this.color;
		game.drawCircle(this.x, this.y, this.r);
		game.ctx.restore();
	}

	Virus.prototype.render = function(){
		game.ctx.save();
		game.ctx.strokeStyle = this.color;
		game.ctx.fillStyle = this.color;
		game.drawCircle(this.x, this.y, this.r);
		game.ctx.restore();
	}

	Virus.prototype.update = function(){

		this.x += this.speedX;
		this.y += this.speedY;

		if(this.x < 0 || this.x > game.canvas.width ){
			this.speedX = -this.speedX;
		}
		if(this.y < 0 || this.y > game.canvas.height){
			this.speedY = -this.speedY;
		}

		for(var i = 0; i < game.virusArr.length; i++){
			for(var j = 0; j < game.playerArr.length; j++){
				if(this.checkCrush(game.virusArr[i], game.playerArr[j])){

					if(game.scene.player.cells.length != 0){
						//player的质量增加相应病毒的重量为负值
						game.scene.player.playerMass += game.virusArr[i].virusMass;
						//player弹出自己cell中的已经吃的食物，然后食物数组中添加该返回的food
						game.foodArr.push(game.scene.player.cells.pop());
						
					}
					//从数组中删除掉被吃掉的virus
					game.virusArr.splice(i,1);

					game.scene.virus = new Virus();
				}
			}
			
		}

	}

	Virus.prototype.checkCrush = function(virus, player){
		var diffX = virus.x - player.x,
			diffY = virus.y - player.y;

		var distance = Math.sqrt(diffX * diffX + diffY * diffY); 

		if(distance <= virus.r + player.r){
			return true;
		}else{
			return false;
		}
	}
})()