(function(){
	var Block = window.Block = function(){
		this.allType = ["I","L","L","J","Z","O","S"][(~~(Math.random() * 7))];
		this.allDirecNum = block_json[this.allType].length;
		this.direction = ~~(Math.random() * this.allDirecNum);

		console.log(this.direction)
		this.code = block_json[this.allType][this.direction];
		this.row = 0;
		this.col = 4;

		console.log(this)
	}

	Block.prototype.render = function(){
		for(var i =0; i<4; i++){
			for(var j =0; j<4; j++){
				if(this.code[i][j] != 0){
					game.setClass(this.row + i, this.col + j, this.allType)
				}
			}
		}
	}

	Block.prototype.check = function(row,col){
		for(var i =0; i<4; i++){
			for(var j =0; j<4; j++){
				if(this.code[i][j] != 0 && game.map.code[row + i][col + j] != 0){
					return false;
				}
			}
		}
		return true;  //没撞就返回true
	}

	Block.prototype.toLeft = function(){
		if(this.check(this.row, this.col - 1)){
			this.col--;
		}
	}

	Block.prototype.rotate = function(){
		//存下原来的方向 是为了判断按下键后，方向值改变了，但是并不能旋转，那么再把原方向还给方向值
		var oldDirec = this.direction;
		//这里判断用了赋值，应该用==，导致无法进入到自加变换，只能变换一次
		if(this.direction == this.allDirecNum - 1){
			this.direction = 0;
		}else{
			this.direction++;
		}

		this.code = block_json[this.allType][this.direction];

		if(!this.check(this.row, this.col)){
			this.direction = oldDirec;
		}
			this.code = block_json[this.allType][this.direction];
	}

	Block.prototype.toRight = function(){
		if(this.check(this.row, this.col + 1)){
			this.col++;
		}
	}

	Block.prototype.toBottom = function(){
		//到底的时候判断也是要提前一行判断 这样才能提前判断出最后一行是非零的
		while(this.check(this.row + 1,this.col)){
			this.row++;
		}
	}


	Block.prototype.addToMap = function(){
		//将4*4的矩阵中不为0的部分添加到地图上，在地图中的位置要加上自己的row和col
		for(var i = 0; i<4; i++){
			for(var j =0; j<4; j++){
				if(this.code[i][j] != 0){
					game.map.code[this.row + i][this.col + j] = this.allType;
				}
			}
		}
	}

	Block.prototype.removeLine = function(){
		for(var i =0; i<20; i++){
			if(!game.map.code[i].includes(0)){
				game.map.code.splice(i,1);
				game.map.code.unshift(new Array(12).fill(0));
				game.score++;
			}
		}
	}

	Block.prototype.fallingDown = function(){
		game.map.code[0].forEach(function(item){
			if(item != 0){
				clearInterval(game.timer);
				alert("Game Over");
				return;
			}
		})
		//在map中提前一行判断是否有非零
		if(this.check(this.row + 1, this.col)){
			this.row++;
		}else{
			//this碰撞了就把this添加到地图中，再生成一个新的转块
			this.addToMap()
			game.block = new Block();
			this.removeLine();
		}
	}

})()