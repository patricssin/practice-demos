(function(){
	var Map = window.Map = function(){

		this.init();
		console.log(this)
	}

	Map.prototype.init = function(){
		this.code = [];
		for(var i = 0; i<20; i++){
			this.code.push([]);
			for(var j =0; j<12; j++){
				this.code[i].push(0);
			}
		}

		this.code.push(new Array(12).fill("A"));
	}

	Map.prototype.render = function(){
		for(var i = 0; i<20; i++){
			for(var j =0; j<12; j++){
				if(this.code[i][j] != 0){
					game.setClass(i,j, this.code[i][j]);
				}
			}
		}
	}

})()