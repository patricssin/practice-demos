(function(){
	var Player = window.Player = function(name, playerMass, X, Y){
		this.playerMass = playerMass;
		this.r = ~~(Math.sqrt(this.playerMass)) * 6 + 4;

		this.x = X - this.r;
		this.y = Y - this.r;
		this.dx = 0;
		this.dy = 0;
		this.cells = [];
		this.name = name;

		//无敌属性
		this.wudi = true;

		this.init();
		this.bindEvent();
		game.playerArr.push(this);
	}

	Player.prototype.init = function(){

		this.color = game.global.playerColor[parseInt(Math.random() * game.global.playerColor.length)];
		game.ctx.save();
		game.ctx.strokeStyle = "rgb(33,199,221)";
		game.ctx.fillStyle = this.color;
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

	Player.prototype.update = function(X, Y){
		//增量 = 鼠标位置 - 当前位置 乘以20ms
		this.targetX = X;
		this.targetY = Y;
		var diff = 10 / this.playerMass;
		this.dx = (X - this.x) * diff;
		this.dy = (Y - this.y) * diff;

		console.log(this.playerMass);

		this.x += this.dx;
		this.y += this.dy;
		this.r = ~~(Math.sqrt(this.playerMass)) * 6 + 4;
	}

	Player.prototype.render = function(){
		//画player圆
		game.ctx.save();
		game.ctx.strokeStyle = "rgb(33,199,221)";
		game.ctx.fillStyle = this.color;
		game.ctx.lineWidth = 10;
		game.drawPlayer(this.x, this.y, this.r);
		game.ctx.restore();
		//画玩家name在圆心位置
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

	Player.prototype.bindEvent = function(){
		var self = this;
		game.canvas.focus();
		game.canvas.onclick = function(event){
			// event.preventDefault();
			
			/*if(event.keyCode == 32){
				self.separate();	
			}*/
			self.separate(event.clientX, event.clientY);
		}

		
	}

	Player.prototype.separate = function(X, Y){
		//当质量大于100的player才可以分解，分解的是质量的一半
		if(this.playerMass > 50){
			console.log(this.playerMass)
			//将质量分成两份，以两份质量来改变player的大小，同时弹出一个分身player
			this.subMass = this.playerMass / 2;
			this.playerMass = this.subMass;
			this.r = ~~(Math.sqrt(this.playerMass)) * 6 + 4;

			this.x = X;
			this.y = Y;

			game.playerArr.splice(0,1);

			//以一半的质量，新生出一个同名player，存放在数组中
			game.player = new Player(this.name + 1, this.playerMass, X, Y);
			// game.player = new Player(this.name + 0, this.playerMass,  X + this.r * 2, Y + this.r * 2);
			game.player = new Player(this.name + 0, this.playerMass,  X + 50, Y + 50);

			// for(var i = 0; i < game.playerArr.length; i++){
			// 	this.playerMove(game.playerArr[i]);
			// }

			
			this.playerMove(game.playerArr[0]);
			// game.playerArr.splice(1,1);
			console.log(game.playerArr[0]);
			

		}
	}

	Player.prototype.playerMove = function(player){
		var deg = Math.atan2(player.y, player.x);
		var diff = 0.5 ;
		this.dx = (player.x - this.x) * diff;
		this.dy = (player.y - this.y) * diff;

		// this.dy = diff * Math.sin(deg);
		// this.dx = diff * Math.cos(deg);

		// diff -= 0.5;
		// if(diff < 0){
		// 	diff = 0;
		// }

		console.log(diff)
		// this.x += dx;
		// this.y += dy;
		this.y = player.y;
		this.x = player.x;
	}

	Player.prototype.froze = function(){
		console.log(111)
	}
})()























