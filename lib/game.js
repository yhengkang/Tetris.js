(function(root) {
	var Tetris = root.Tetris = (root.Tetris || {});

	var Game = Tetris.Game = function($el, dimX, dimY) {
		this.dimX = dimX;
		this.dimY = dimY;
		this.display = new Tetris.Display($el, dimX, dimY);
		this.currPiece = null;
	}

	Game.prototype.canRotate = function() {
		var that = this;
		var canRotate = true;
		clonedPiece = jQuery.extend(true, {}, this.currPiece);
		clonedPiece.rotate();

		clonedPiece.blocks().forEach(function(block){
			if (that.display.isOccupied(block)){
				canRotate = false;
			}
		})
		return canRotate;
	}

	Game.prototype.canMove = function(dir) {
		var that = this;
		var canMove = true;
		clonedPiece = jQuery.extend(true, {}, this.currPiece);
		clonedPiece.moveSideways(dir)

		clonedPiece.blocks().forEach(function(block){
			if (that.display.isOccupied(block)){
				canMove = false;
			}
		})
		return canMove;
	}

	Game.prototype.newCurrPiece = function() {
		this.currPiece = null;
		// debugger;
		var spawnPoint = [ Math.round(this.dimX/2), this.dimY - 2]
		var PIECES = [new Tetris.Zpiece(spawnPoint), new Tetris.Lpiece(spawnPoint)]

		// this.currPiece = new Tetris.Lpiece([1,8])
		this.currPiece = PIECES[Math.floor(Math.random()*PIECES.length)]
		// this.currPiece = new Tetris.Lpiece(spawnPoint);
		this.display.currPiece = this.currPiece;
	}

	//refactor into display
	Game.prototype.clearLines = function() {
		for (var i = 0; i < this.display.dimY; i++){
			var completedLine = true;
			for(var j = 0; j < this.display.dimX; j++){
				if (!this.display.isOccupied([j, i])){
					completedLine = false;
				}
			}
			if (completedLine){
				this.display.removeLine(i);
				this.display.moveBlocksDown(i);
				i--;
			}
		}
	}

	Game.prototype.step = function() {

		var that = this;
		var notBlocked = true;
		this.currPiece.blocks().forEach(function(block){
			var nextBlock = [block[0], block[1] -1]
			if (that.display.isOccupied(nextBlock)){
				notBlocked = false
			} 
		})

		if (notBlocked) {
			this.currPiece.moveDown();
		} else {
			this.display.addBlocks(this.currPiece);
			this.newCurrPiece();
		}

		this.clearLines();
	}

	// left 37
	// up 38
	// right 39
	// down 40

	Game.prototype.bindKeys = function() {
		var that = this;
		$(window).keydown(function(event){

			if(event.keyCode == 38){
				if(that.canRotate()){
					that.currPiece.rotate();
				}	
			} 

			if(event.keyCode == 37){
				if(that.canMove(-1)){
					that.currPiece.moveSideways(-1);	
				}
			}

			if(event.keyCode == 39){
				if(that.canMove(1)){
					that.currPiece.moveSideways(1);	
				}
			}

			// if(event.keyCode == 40){
				// need to check if we can move down	
			// }
			
		});
	}

	Game.prototype.run = function() {
		this.bindKeys();
		// window.setInterval(this.clearLines.bind(this), 50);
		window.setInterval(this.display.render.bind(this.display), 50);
		window.setInterval(this.step.bind(this), 1000);
	}

})(this);