(function(){
	var Wall = window.Wall = function(){
		this.wallDown = game.res["wall_down"];
		this.wallUp = game.res["wall_up"];

		this.x = game.canvas.width;
		this.wallDownHeight = parseInt(Math.random() * 101) + 180; //[80,330]

		this.gap = 120;

		this.wallUpHeight = game.canvas.height - 90 - this.wallDownHeight - this.gap;

		game.wallArr.push(this);

		// this.isScore = false;


	}

	Wall.prototype.render = function(){
		game.ctx.drawImage(this.wallDown, 0, 363 - this.wallDownHeight, 37, this.wallDownHeight, this.x, 0, 37, this.wallDownHeight);
		game.ctx.drawImage(this.wallUp, 0, 0, 37, this.wallUpHeight, this.x, this.wallDownHeight+this.gap, 37, this.wallUpHeight);
	}

	Wall.prototype.update = function(){
		this.x -= 2;

		if(this.x < -37){
			this.goDie();
		}

        this.x1 = parseInt(this.x);
        this.x2 = parseInt(this.x + 37);
        this.y1 = parseInt(this.wallDownHeight);
        this.y2 = parseInt(this.wallDownHeight + this.gap);

        if(  game.scene.plane.x2 > this.x1 && (game.scene.plane.y1 < this.y1 || game.scene.plane.y2 > this.y2 ) && game.scene.plane.x1 < this.x2 ){
            game.scene.sceneNum = 3;
            game.scene.init(3);
        }else {
            // this.isScore = true;
            game.f % 20 == 0 && game.scene.score++;
        }
	}

	Wall.prototype.goDie = function(){
		for(var i = 0; i<game.wallArr.length; i++){
			if(game.wallArr[i] == this){
				game.wallArr.splice(i,1);
			}
		}

	}
})()