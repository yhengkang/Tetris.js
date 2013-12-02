(function(root){
	var Tetris = root.Tetris = (root.Tetris || {});

	var Display = Tetris.Display = function($el, dimX, dimY) {
		this.$el = $el;
		this.dimX = dimX;
		this.dimY = dimY;
		this.currPiece = null;
		// this.deadBlocks = [];
		this.deadBlocks = {};
	}

	Display.prototype.isOccupied = function(pos) {
		
		if ( pos[0] == -1 || pos[0] == this.dimX || pos[1] == -1){
			return true;
		}

		var occupied = false;
		for(var color in this.deadBlocks){
			this.deadBlocks[color].forEach(function(block){
				if (block[0] == pos[0] && block[1] == pos[1]) {
					occupied = true;
				}
			})
		}
		return occupied;
	}

	Display.prototype.addBlocks = function(piece) {
		this.deadBlocks[piece.color] = (this.deadBlocks[piece.color] || []);
		this.deadBlocks[piece.color] = this.deadBlocks[piece.color].concat(piece.blocks());
	}

	Display.prototype.removeLine = function(y) {
		var newDeadBlocks = {};

		for(var color in this.deadBlocks){
			this.deadBlocks[color].forEach(function(block){
				if( block[1] !== y ){
					newDeadBlocks[color] = (newDeadBlocks[color] || []);
					newDeadBlocks[color].push(block);
				}
			})
		}
		this.deadBlocks = newDeadBlocks;
	}

	Display.prototype.moveBlocksDown = function(y) {
		var newDeadBlocks = {};
		for(var color in this.deadBlocks){
			this.deadBlocks[color].forEach(function(block){
				newDeadBlocks[color] = (newDeadBlocks[color] || [])
				if ( block[1] > y ){
					newDeadBlocks[color].push([ block[0], block[1]-1 ]);
				} else {
					newDeadBlocks[color].push(block);
				}
			})
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
		for(var color in this.deadBlocks){
			this.deadBlocks[color].forEach(function(block){
				that.$el.find("div[data-position=\"[" + block[0] + "][" + block[1] + "]\"]").addClass(color);
			})
		}

		this.currPiece.blocks().forEach(function(block){
			that.$el.find("div[data-position=\"[" + block[0] + "][" + block[1] + "]\"]").addClass(that.currPiece.color);
		})
	}

	Display.prototype.render = function() {
		this.$el.empty();
		this.createBoard();
		this.fill();
	}



})(this);