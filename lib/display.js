(function(root){
	var Tetris = root.Tetris = (root.Tetris || {});

	var Display = Tetris.Display = function($el, dimX, dimY) {
		this.$el = $el;
		this.dimX = dimX;
		this.dimY = dimY;
		this.currPiece = null;
		var floor = []

		for(var i = 0; i < dimX; i ++){
			floor.push([i,-1]);
		}

		var walls = []
		for(var j = 0; j < dimY; j++){
			walls.push([-1, j]);
			walls.push([dimX, j]);
		}

		this.deadBlocks = floor.concat(walls);
	}


	// ILLEGAL RETURN?
	Display.prototype.isOccupied = function(pos) {
		var occupied = false;
		this.deadBlocks.forEach(function(block){
			if( block[0] === pos[0] && block[1] === pos[1]) {
				occupied = true;
			}
		});
		return occupied;
	}

	Display.prototype.addBlocks = function(piece) {
		this.deadBlocks = this.deadBlocks.concat(piece.blocks());
	}



	Display.prototype.removeLine = function(y) {
		var newDeadBlocks = [];
		for(var i = 0; i < this.deadBlocks.length; i++){
			if ( this.deadBlocks[i][1] !== y ){
				// clear the specified line
				newDeadBlocks.push(this.deadBlocks[i]);
			}
		}
		this.deadBlocks = newDeadBlocks;
	}

	Display.prototype.moveBlocksDown = function(y) {
		var newDeadBlocks = [];

		for(var i = 0; i < this.deadBlocks.length; i++){
			if ( this.deadBlocks[i][1] > y) {
				// move blocks down
				// console.log([this.deadBlocks[i][0], this.deadBlocks[i][1] - 1]);
				newDeadBlocks.push( [this.deadBlocks[i][0], this.deadBlocks[i][1] - 1]);
			} else {
				newDeadBlocks.push( this.deadBlocks[i] )	
			}
		}

		this.deadBlocks = newDeadBlocks;
	}

	Display.prototype.createBoard = function() {
		for(var i = this.dimY - 1; i >= 0; i--){
			var row = $("<div class=\"row\" data-row=\"" + i + "\"></div>");
			this.$el.append(row);
			for(var j = 0; j < this.dimX; j++){
				var cell = $("<div class=\"cell\" data-position=\"[" + j + "][" + i + "]\"><div>");
				row.append(cell);
			}
		}
	}

	Display.prototype.fill = function() {
		var that = this;
		this.deadBlocks.forEach(function(block){	
			that.$el.find("div[data-position=\"[" + block[0] + "][" + block[1] + "]\"]").addClass("block");
		})

		this.currPiece.blocks().forEach(function(block){
			that.$el.find("div[data-position=\"[" + block[0] + "][" + block[1] + "]\"]").addClass("block");
		})
	}

	Display.prototype.render = function() {
		this.$el.empty();
		this.createBoard();
		this.fill();
	}



})(this);