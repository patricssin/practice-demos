(function(){
	var Ai = window.Ai = function(){

		this.playerMass = 100;
		this.r = ~~(Math.sqrt(this.playerMass)) * 6 + 4;
		this.x = parseInt(Math.random() * 1500);
		this.y = parseInt(Math.random() * 1000);
		do{
			this.speedX = ~~(Math.random() * 10) - 5;
			this.speedY = ~~(Math.random() * 10) - 5;
		}while(this.speedX == 0 && this.speedY == 0)

		this.cells = [];
		this.name = "AI";

		this.init();
		// this.bindEvent();
	}

	Ai.prototype.init = function(){
		game.ctx.save();
		game.ctx.strokeStyle = "#755448";
		game.ctx.fillStyle = "#af7d6b";
		game.ctx.lineWidth = 10;
		game.drawPlayer(this.x, this.y, this.r);
		game.ctx.restore();

		game.ctx.save();
		game.ctx.lineWidth = 3;
		game.ctx.fillStyle = "#fff";
		game.ctx.strokeStyle = "#000";
		game.ctx.textAlign = "center";
		game.ctx.lineJoin = "round";
		game.ctx.textBaseline = "middle";

		//字体大小随半径大小变化，半径随质量变化
		var fontSize =  Math.max(this.r / 3, 12);
		game.ctx.font = 'bold ' + fontSize + 'px sans-serif';
		game.ctx.strokeText(this.name, this.x, this.y);
		game.ctx.fillText(this.name, this.x, this.y);
		game.ctx.restore();
	}


	Ai.prototype.render = function(){
		game.ctx.save();
		game.ctx.strokeStyle = "#755448";
		game.ctx.fillStyle = "#af7d6b";
		game.ctx.lineWidth = 10;
		game.drawPlayer(this.x, this.y, this.r);
		game.ctx.restore();

		game.ctx.save();
		game.ctx.lineWidth = 3;
		game.ctx.fillStyle = "#fff";
		game.ctx.strokeStyle = "#000";
		game.ctx.textAlign = "center";
		game.ctx.lineJoin = "round";
		game.ctx.textBaseline = "middle";

		//字体大小随半径大小变化，半径随质量变化
		var fontSize =  Math.max(this.r / 3, 16);
		game.ctx.font = 'bold ' + fontSize + 'px sans-serif';
		game.ctx.strokeText(this.name, this.x, this.y);
		game.ctx.fillText(this.name, this.x, this.y);
		game.ctx.restore();
	}

	Ai.prototype.update = function(){
		this.x += this.speedX;
		this.y += this.speedY;

		if(this.x < 0 || this.x > game.canvas.width ){
			this.speedX = -this.speedX;
		}
		if(this.y < 0 || this.y > game.canvas.height){
			this.speedY = -this.speedY;
		}

			for(var j = 0; j < game.playerArr.length; j++){
				if(game.scene.food.checkCrush(game.scene.ai, game.playerArr[j])){
						if(game.scene.ai.playerMass > game.playerArr[j].playerMass){
							game.scene.init(3);
							game.scene.sceneNum = 3;
						}else{
							game.scene.player.wudi = false;
							game.scene.player.playerMass += game.scene.ai.playerMass;
							game.scene.player.cells.push(game.scene.ai.playerMass);

							game.scene.ai = new Ai();
						}
					
					
				}
			}
	}
})()