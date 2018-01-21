(function(){
	var Scene = window.Scene = function(){
		this.sceneNum = 1;

		this.init(1);
		console.log(this)

		this.bindEvent();
	}

	Scene.prototype.init = function(number){
		switch(number){
			case 1:
				this.background = new Background();
				break;
			case 2:
				this.background = new Background();

				for(var i = 0; i < 30; i++){
					this.food = new Food()
				}

				this.ai = new Ai();

				for(var i = 0; i < 8; i++){
					this.virus = new Virus()
				}
				this.player = new Player(str, 20, game.global.screenWidth / 2, game.global.screenHeight / 2);

				break;
			case 3:
				this.background = new Background();
				break;
		}
	}

	Scene.prototype.render = function(){
		switch(this.sceneNum){
			case 1:
				this.background.render();
				break;
			case 2:
				this.background.render();

				this.ai.render();
				this.ai.update();

				for(var i = 0; i < game.foodArr.length; i++){
					game.foodArr[i].update();
					game.foodArr[i].render();
				}

				for(var i = 0; i < game.virusArr.length; i++){
					game.virusArr[i].update();
					game.virusArr[i].render();
				}
				
				//player后渲染，覆盖在food上面
				this.player.render();

				break;
			case 3:

				this.background.render();
				
				for(var i = 0; i < game.foodArr.length; i++){
					game.foodArr[i].update();
					game.foodArr[i].render();
				}

				for(var i = 0; i < game.virusArr.length; i++){
					game.virusArr[i].update();
					game.virusArr[i].render();
				}
				
				this.ai.render();
				this.ai.update();

				game.playerArr = [];

				this.color = game.global.playerColor[parseInt(Math.random() * game.global.playerColor.length)];
				game.ctx.save();
				game.ctx.strokeStyle = "#26bd64";
				game.ctx.fillStyle = "#2ecc71";
				game.ctx.lineWidth = 16;
				game.ctx.lineJoin = "round";
				game.ctx.strokeRect($(window).width() / 2 - 200, $(window).height() / 2 - 100, 300, 120)
				game.ctx.fillRect($(window).width() / 2 - 200, $(window).height() / 2 - 100, 300, 120);

				game.ctx.restore();

				game.ctx.save();
				game.ctx.lineWidth = 3;
				game.ctx.fillStyle = "#fff";
				game.ctx.strokeStyle = "#000";
				game.ctx.textAlign = "center";
				game.ctx.lineJoin = "round";
				game.ctx.textBaseline = "middle";

				//字体大小随半径大小变化，半径随质量变化
				var fontSize =  50;
				game.ctx.font = 'bold ' + fontSize + 'px sans-serif';
				game.ctx.strokeText("Game Over", $(window).width() / 2 - 50, $(window).height() / 2 - 40);
				game.ctx.fillText("Game Over",$(window).width() / 2 - 50 , $(window).height() / 2 - 40);
				game.ctx.restore();
				break;
		}
	}

	Scene.prototype.bindEvent = function(){
		var self = this;
		game.canvas.onmousemove = function(event){

			switch(self.sceneNum){
			case 1:

				break;
			case 2:
				self.player.update(event.clientX, event.clientY);

				break;
			case 3:

				break;
			}	
		}

		game.canvas.onkeydown = function(event){
			// event.preventDefault();
			console.log(000)
			if(event.keyCode == 37){
				self.froze();	
			}
		}

	}
})()