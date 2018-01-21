(function(){
	var Game = window.Game = function(){
		this.frame = 0;
		this.foodArr = [];
		this.playerArr = [];
		this.virusArr = [];
		this.init();
		this.start();
		this.bindEvent();

	}

	Game.prototype.init = function(){
		this.canvas = $("#canvas")[0];
		this.ctx = this.canvas.getContext("2d");

		this.global = {
			screenWidth: window.innerWidth,
		    screenHeight: window.innerHeight,
		    gameWidth: 0,
		    gameHeight: 0,
		    backgroundColor: '#f2fbff',
    		lineColor: '#000000',
    		foodColor: ["#f44336","#e91e63","#9c27b0","#673ab7","#3f51b5","#2196f3","#03a9f4","#00bcd4","#009688","#4caf50","#8bc34a","#cddc39","#ffeb3b","#ff9800","#ff5722","#795548","#607d8b"],
    		playerColor: ["rgb(39,225,248)"]

		}


	}

	Game.prototype.drawCircle = function(centerX, centerY, radius, sides){
		var theta = 0,
			x = 0,
			y = 0;

		this.ctx.beginPath();

		for(var i = 0; i < sides; i++){
			theta = (i / sides) * 2 * Math.PI;
			x = centerX + radius * Math.sin(theta);
			y = centerY + radius * Math.cos(theta);

			this.ctx.lineTo(x, y);
		}

		this.ctx.closePath();
		this.ctx.stroke();
		this.ctx.fill();
	}

	Game.prototype.drawPlayer = function(centerX, centerY, radius){
		this.ctx.beginPath();
		this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
		this.ctx.closePath();
		this.ctx.stroke();
		this.ctx.fill();
	}

	Game.prototype.clear = function(){
		this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
	}

	Game.prototype.bindEvent = function(){
		var self = this;
		this.canvas.onmousemove = function(event){

			self.player.update(event.clientX, event.clientY);
		}

	}

/*	Game.prototype.moveLoop = function(){

		for(var i = 0; i < this.playerArr.length; i++){
			this.player.playerMove(this.playerArr[i]);
		}
	}*/

	Game.prototype.start = function(){
		var self = this;

		this.timer = setInterval(function(){
			self.frame++;
			//食物中使用game所以放入主循环中执行new
			// self.food = new Food();
			self.clear();
			// self.background.update();
			self.background.render();

			
			for(var i = 0; i < self.foodArr.length; i++){
				self.foodArr[i].update();
				self.foodArr[i].render();
			}

			for(var i = 0; i < self.virusArr.length; i++){
				self.virusArr[i].update();
				self.virusArr[i].render();
			}
			
			//player后渲染，覆盖在food上面
			self.player.render();
		
		},20);


		//两个new中都用到了game，都需要异步处理，都放入到定时器中
		setTimeout(function(){

			self.background = new Background();

			for(var i = 0; i < 50; i++){
				self.food = new Food()
			}

			for(var i = 0; i < 8; i++){
				self.virus = new Virus()
			}
			self.player = new Player("player01", 30, self.global.screenWidth / 2, self.global.screenHeight / 2);
		},0);
	}
})()