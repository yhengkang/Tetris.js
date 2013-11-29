(function(root) {
	var Tetris = root.Tetris = (root.Tetris || {});

	var Game = Tetris.Game = function($el, dimX, dimY) {
		this.display = new Tetris.Display($el, dimX, dimY);
		this.currPiece = null;
	}

	// Game.prototype.checkCollision = function() {
	// 	var that = this;
	// 	var collided = false;
	// 	this.currPiece.blocks.forEach(function(block){
	// 		if (that.display.isOccupied(block)){
	// 			collided = true;
	// 		}
	// 	})

	// 	if (collided){
	// 		this.display.addBlocks(this.currPiece);
	// 		this.newCurrPiece();
	// 	}
	// }

	Game.prototype.canRotate = function() {
		// console.log("Checking rotation..")
		// return true;
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

	Game.prototype.newCurrPiece = function() {
		this.currPiece = null;
		var PIECES = [new Tetris.Lpiece([1,8]), new Tetris.Lpiece([1,8])];
		this.currPiece = PIECES[Math.floor(Math.random()*PIECES.length)]
		this.display.currPiece = this.currPiece;
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



	}

	Game.prototype.bindKeys = function() {
		var that = this;
		$(window).keydown(function(){
			if(that.canRotate()){
				// console.log("rotating");
				that.currPiece.rotate();
			}
		});
	}

	Game.prototype.run = function() {
		this.bindKeys();
		window.setInterval(this.display.render.bind(this.display), 50);
		window.setInterval(this.step.bind(this), 1000);
	}

})(this);