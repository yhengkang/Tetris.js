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
		this.deadBlocks = floor;
	}


	// ILLEGAL RETURN??!?!?!
	Display.prototype.isOccupied = function(pos) {
		// debugger;
		var occupied = false;
		this.deadBlocks.forEach(function(block){
			// debugger;
			if( block[0] === pos[0] && block[1] === pos[1]) {
				// return true;
				occupied = true;
			}
		});
		return occupied;
		// return false;
	}

	Display.prototype.addCurrPiece = function(piece) {
		this.currPiece = piece;
	}

	Display.prototype.addBlocks = function(piece) {
		this.deadBlocks = this.deadBlocks.concat(piece.blocks());
	}

	Display.prototype.createBoard = function() {
		for(var i = this.dimY - 1; i >= 0; i--){
			var row = $("<div class=\"row\" data-row=\"" + i + "\"></div>");
			// var row = this.$el.append("<div class=\"row\"></div>");
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