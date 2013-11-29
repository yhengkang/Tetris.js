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
			this.currPiece = null;
		}
	}

	Game.prototype.newCurrPiece = function() {
		this.currPiece = null;
		var PIECES = [];
		this.currPiece = PIECES[Math.round(Math.random()*PIECES.length)]
	}

	Game.prototype.step = function() {

	}

	Game.prototype.run = function() {
		// window.setInterval(this.display.render.bind(this.display), 500)

	}

})(this);