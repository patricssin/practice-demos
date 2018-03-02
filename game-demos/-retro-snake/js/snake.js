(function(){
	var Snake = window.Snake = function(){
		this.body = [
			{"row": 6, "col": 9},
			{"row": 6, "col": 8},
			{"row": 6, "col": 7},
			{"row": 6, "col": 6},
			{"row": 6, "col": 5},
			{"row": 7, "col": 5},
		];

		this.direction = "R";

		this.oldDirection = "R";

	}

	Snake.prototype.render = function(){
		game.changeColor(this.body[0].row, this.body[0].col, "skyblue");
		for(var i = 1; i<this.body.length;i++){
			game.changeColor(this.body[i].row, this.body[i].col, "pink");
		}
	}

	Snake.prototype.update = function(){
		if(this.oldDirection == "R" && this.direction == "L"
			||
			this.oldDirection == "L" && this.direction == "R"
			||
			this.oldDirection == "U" && this.direction == "D"
			||
			this.oldDirection == "D" && this.direction == "U"){

			this.direction = this.oldDirection;
		}

		this.oldDirection = this.direction;

		switch(this.direction){

			case "L":
				var head = {"row":this.body[0].row, "col":this.body[0].col - 1};
				break;
			case "R":
				var head = {"row":this.body[0].row, "col":this.body[0].col + 1};
				break;
			case "U":
				var head = {"row":this.body[0].row - 1, "col":this.body[0].col};
				break;
			case "D":
				var head = {"row":this.body[0].row + 1, "col":this.body[0].col};
				break;
		}
		this.body.unshift(head);

		if(!game.food.check()){
			this.body.pop();
		}else{
			game.creatFood();
		}

	}

	Snake.prototype.changeDir = function(dir){
		this.direction = dir;
	}

	Snake.prototype.checkDie = function(){
		
		if(this.body[0].row < 0 || this.body[0].row > 14 || this.body[0].col < 0 || this.body[0].col > 14){
			return true;
		}

		for(var i = 1; i < this.body.length; i++){
			if(this.body[i].row == this.body[0].row && this.body[i].col == this.body[0].col){
				return true;
			}
		}
	}
})();