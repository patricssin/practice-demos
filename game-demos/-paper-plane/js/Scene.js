(function(){
	var Scene = window.Scene = function(){
		this.sceneNum = 1;
		this.init(1);
		this.bindEvent();
		this.score = 0;
		this.hillX = 0;
	}

	Scene.prototype.init = function(number){
		switch(number){
			case 1:
				this.background = new Background();
				this.plane = new Plane();
				this.cloud = new Cloud();

				game.ctx.drawImage(game.res["hill"], 0, 300);

				this.titleY = 70;
				this.opacity = 0;

				break;
			case 2:
				this.background = new Background();
				this.plane = new Plane();
				this.cloud = new Cloud();
				// this.wall = new Wall();
				game.ctx.drawImage(game.res["hill"], 0, 300);
				break;
			case 3:

				break;

		}
	}

	Scene.prototype.render = function(){
		switch(this.sceneNum){
			case 1:
				this.background.render();
				
				game.ctx.drawImage(game.res["hill"], this.hillX, 300);


				game.ctx.save();
				this.opacity += 0.01;
				if(this.opacity > 1){
					this.opacity = 1;
				}
				game.ctx.globalAlpha = this.opacity;
				game.ctx.drawImage(game.res["title"], (game.canvas.width - 296)/2, this.titleY);
				game.ctx.strokeStyle = "#fff";
				game.ctx.setLineDash([6, 8]);
				game.ctx.lineWidth = 2;
				game.ctx.beginPath();
				game.ctx.arc((game.canvas.width - 296)/2 + 200, this.titleY+120, 100, 0, 1.5, false);
				game.ctx.stroke();
				game.ctx.restore();

				game.ctx.save();
				game.ctx.strokeStyle = "#fff";
				game.ctx.fillStyle = "#fff";
				game.ctx.lineWidth = 1;
				game.ctx.textAlign = "center";
				// game.ctx.lineJoin = "round";
				game.ctx.textBaseline = "middle";
				game.ctx.font = 40;
				game.ctx.strokeText("Tap and Hold", (game.canvas.width - 296)/2 + 200, this.titleY+120);
				game.ctx.fillText("Tap and Hold",(game.canvas.width - 296)/2 + 200, this.titleY+120);
				game.ctx.restore();

				this.cloud.update();
				this.cloud.render();

				this.plane.render();
				break;
			case 2:

				this.background.update();
				this.background.render();

				this.hillX -= 2;
				game.ctx.drawImage(game.res["hill"], this.hillX, 300);

				game.f % 100 == 0 && new Wall();
				for(var i = 0; i< game.wallArr.length; i++){
					game.wallArr[i].update();
					game.wallArr[i].render();
				}
				this.cloud.update();
				this.cloud.render();

				this.plane.update();
				this.plane.render();
				break;
			case 3:
				this.background.render();

				for(var i = 0; i< game.wallArr.length; i++){
					game.wallArr[i].render();
				}

				game.ctx.save();
				game.ctx.strokeStyle = "#fff";
				// game.ctx.strokeStyle = "#1281f1";
				game.ctx.fillStyle = "#2189f0";
				game.ctx.lineWidth = 16;
				game.ctx.lineJoin = "round";
				game.ctx.strokeRect((game.canvas.width - 296)/2, this.titleY + 160, 300, 120)
				game.ctx.fillRect((game.canvas.width - 296)/2 , this.titleY + 160, 300, 120);

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
				game.ctx.strokeText("Game Over", (game.canvas.width - 296)/2 + 150, this.titleY+220);
				game.ctx.fillText("Game Over",(game.canvas.width - 296)/2 + 150, this.titleY+220);
				game.ctx.restore();

				this.plane.render();
				this.cloud.render();

				this.plane.y += 5;
				break;

		}
	}

	Scene.prototype.bindEvent = function(){
		var self = this;
		var mousetimer;

		game.canvas.onmousedown = function(event){
			switch(self.sceneNum){
				case 1:
                        // 进入2号场景
                        self.sceneNum = 2;
                        self.init(2);
                    break;
                case 2:
                	mousetimer = setInterval(function(){
		                self.plane.fly();            
		            });
		            break;
		        case 3:
		        	break;

			}
		}

		game.canvas.onmouseup = function(){
			switch(self.sceneNum){
				case 1:

                    break;
                case 2:
                	clearInterval(mousetimer);
		            break;
		        case 3:
		        	break;

			}
		}
	}
})()