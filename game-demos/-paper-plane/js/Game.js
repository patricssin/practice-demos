(function(){
	var Game = window.Game = function(){
		this.f = 0;
		this.init();
		this.wallArr = [];

		// this.bindEvent();
	}

	Game.prototype.init = function(){
		//获取到画布
		this.canvas = document.getElementById("canvas");
		this.ctx = this.canvas.getContext("2d");
		//建立资源管理器
		this.res = {
			"cloud": "images/cloud.png",
			"plage": "images/plane.png",
			"wall_down": "images/wall_down.png",
			"wall_up": "images/wall_up.png",
			"plane": "images/plane.png",
			"hill": "images/hill.png",
			"title": "images/title.png",
			"line": "images/line.png"
		}
		//判断图片是否加载完成
		var count = 0; 
		var length = Object.keys(this.res).length;
		//遍历对象，每次循环生成新的image对象
		for(var i in this.res){
			var image = new Image();
			image.src = this.res[i];
			this.res[i] = image;

			var self = this;
			image.onload = function(){
				count++;
				
				self.clear();
				
				self.ctx.save();
				self.ctx.font = "18px 微软雅黑";
				self.ctx.fillStyle = "blue";
				self.ctx.textAlign = "center";
				self.ctx.fillText(`加载中${count}/${length}`, self.canvas.width/2, 80);
				self.ctx.restore();
				//如果图片加载完成开始执行主循环
				if(count == length){
					self.start();
				}
			}
		}
	};

	Game.prototype.clear = function(){
		this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
	}

	Game.prototype.start = function(){
		var self = this;
		this.scene = new Scene();
		this.timer = setInterval(function(){
			self.f++;

			self.clear();

			self.scene.render();
			self.ctx.font = "16px 微软雅黑";
			self.ctx.fillText(`飞行 ${self.scene.score} 米`, 10, 20);
		},20);
	}
})()