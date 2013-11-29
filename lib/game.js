(function(root) {
	var Tetris = root.Tetris = (root.Tetris || {});

	var Game = Tetris.Game = function($el, dimX, dimY) {
		this.display = new Tetris.Display($el, dimX, dimY);
		this.currPiece = null;
	}

	Game.prototype.checkCollision = function() {
		var that = this;
		var collided = false;
		this.currPiece.blocks.forEach(function(block){
			if (that.display.isOccupied(block)){
				collided = true;
			}
		})

		if (collided){
			this.display.addBlocks(this.currPiece);
			this.newCurrPiece();
		}
	}

	Game.prototype.newCurrPiece = function() {
		this.currPiece = null;
		var PIECES = [new Tetris.Lpiece([1,8]), new Tetris.Lpiece([1,8])];
		this.currPiece = PIECES[Math.floor(Math.random()*PIECES.length)]
		this.display.currPiece = this.currPiece;
	}

	Game.prototype.step = function() {
		// this.newCurrPiece();
		this.currPiece.moveDown();
	}

	Game.prototype.run = function() {
		window.setInterval(this.display.render.bind(this.display), 50);
		window.setInterval(this.step.bind(this), 1000);
	}

})(this);