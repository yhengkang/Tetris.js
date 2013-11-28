(function(root){
	var Tetris = root.Tetris = (root.Tetris || {});

	var Display = Tetris.Display = function($el, dimX, dimY) {
		this.$el = $el;
		this.dimX = dimX;
		this.dimY = dimY;
		this.deadBlocks = [];
	}

	Display.prototype.isOccupied = function(pos) {
		this.occupiedSpaces.forEach(function(space){
			if( space[0] == pos[0] && space[1] == pos[1]) {
				return true;
			}
		});
	}


	// can be refactored to add piece and pass in piece
	Display.prototype.addBlocks = function(piece) {
		this.deadBlocks = this.deadBlocks.concat(piece.blocks());
	}

	Display.prototype.createBoard = function() {
		for(var i = this.dimY - 1; i >= 0; i--){
			var row = $("<div class=\"row\" data-row=\"" + i + "\"></div>");
			// var row = this.$el.append("<div class=\"row\"></div>");
			this.$el.append(row);
			for(var j = 0; j < this.dimX; j++){
				var cell = $("<div class=\"cell\" data-position=[" + j + "][" + i + "]\"><div>");
				row.append(cell);
			}
		}
	}


})(this);