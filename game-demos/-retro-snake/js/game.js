(function(){
	var Game = window.Game = function(){
		this.table = null;
		this.snake = new Snake();  //snake作为game的属性同时也是Snake的实例
		this.food = null;
		this.init();
		this.start();   //用来存this，在主循环中

		this.bindEvent();
	}

	Game.prototype.init = function(){
		this.table = document.createElement("table");
		for(var row=0;row<15; row++){
			this.tr = document.createElement("tr");
			for(var col = 0; col < 15; col++){
				this.td = document.createElement("td");
				this.tr.appendChild(this.td);
			}
			this.table.appendChild(this.tr);
		}
		document.body.appendChild(this.table);
	}

	Game.prototype.changeColor = function(row,col,color){
		this.table.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].style.backgroundColor = color;
	}

	Game.prototype.changeHtml = function(row,col,html){
		this.table.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].innerHTML = html;
	}

	Game.prototype.creatFood = function(){
		this.changeHtml(this.food.row, this.food.col, "");
		this.food = new Food();
	}

	Game.prototype.clear = function(){
		for(var row=0;row<15; row++){
			for(var col = 0; col < 15; col++){
				this.changeColor(row,col,"#fff");
			}
		}
	}

	Game.prototype.bindEvent = function(){
		var self = this;
		document.onkeydown = function(event){
			switch(event.keyCode){
				case 37:
					self.snake.changeDir("L");
					break;
				case 38:
					self.snake.changeDir("U");
					break;
				case 39:
					self.snake.changeDir("R");
					break;
				case 40:
					self.snake.changeDir("D");
					break;
			}
		}
	}

	Game.prototype.start = function(){
		var self = this;
		var timer = setInterval(function(){
			// self.snake = new Snake();   //写在这里每次都会new新的蛇出现就不会移动了
			if(!self.food){
				self.food = new Food();
			}

			self.clear();
			self.snake.update();
			// self.snake.render();

			if(!self.snake.checkDie()){
				self.snake.render();
			}else{
				clearInterval(timer);
				alert("Game Over!");
			}

		},800);
	}
	
})()