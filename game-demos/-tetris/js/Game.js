(function(){
	var Game = window.Game = function(){
		this.frame = 0;
		this.score = 0;
		this.init();
		this.block = new Block();
		this.map = new Map();

		this.start();
		this.bindEvent();
	}

	Game.prototype.init = function(){
		this.$dom = $("<table></table>");
		for(var i =0; i<20; i++){
			this.tr = $("<tr></tr>");
			for(var j = 0; j<12; j++){
				this.td = $("<td></td>");
				this.tr.append(this.td);
			}
			this.$dom.append(this.tr);
		}
		$("body").append(this.$dom);
	}

	Game.prototype.bindEvent = function(){
		var self = this;
		$(document).keydown(function(event){
			switch(event.keyCode){
				case 37:
					self.block.toLeft();
					break;
				case 38:
					self.block.rotate();
					break;
				case 39:
					self.block.toRight();
					break;
				case 40:
					self.block.toBottom();
					break;
			}
		});
	}



	Game.prototype.setClass = function(row,col,className){
		$("tr").eq(row).children("td").eq(col).attr("class", className);
	}

	Game.prototype.clear = function(){
		for(var i =0; i<20; i++){
			for(var j = 0; j<12; j++){
				this.setClass(i,j,"");
			}
		}
	}

	Game.prototype.start = function(){
		var self = this;
		var timer = setInterval(function(){
			self.frame++;
			self.clear();
			self.frame % 30 == 0 && self.block.fallingDown();
			self.block.render();
			self.map.render();

			$("h1").text(self.score);
		},20);
	}
})()