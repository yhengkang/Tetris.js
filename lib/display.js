(function(root){
	var Tetris = root.Tetris = (root.Tetris || {});

	var createBoardArray = function(dimX, dimY){
		var boardArr = [];
		for(var j = 0; j < dimY + 2; j++){
			var emptyLine = [];
			for(var i = 0; i < dimX; i++){
				emptyLine.push(false);
			}
			boardArr.push(emptyLine);
		}
		return boardArr;
	}

	var Display = Tetris.Display = function($el, dimX, dimY) {
		this.$el = $el;
		this.dimX = dimX;
		this.dimY = dimY;
		this.currPiece = null;
		this.board = createBoardArray(dimX, dimY);

		this.deadBlocks = {};
	}

	Display.prototype.isOccupied = function(pos) {
		var posX = pos[0];
		var posY = pos[1];

		if (posX < 0 || posX > this.dimX-1 || posY < 0){
			return true;
		}

		var occupied = false;
		if (this.board[posY][posX]){
			occupied = true;
		}
		return occupied;
	}

	Display.prototype.addBlocks = function(piece) {
		var that = this;
		var color = piece.color;
		var blocks = piece.blocks();

		blocks.forEach(function(block){
			var posX = block[0];
			var posY = block[1];
			that.board[posY][posX] = color;
		});
	}

	Display.prototype.removeLine = function(y) {
		var emptyLine = [];
		for(var i = 0; i < this.dimX; i++){
			emptyLine.push(false);
		}
		this.board[y] = emptyLine;
	}

	Display.prototype.moveBlocksDown = function(y) {
		var emptyLine = [];
		for(var i = 0; i < this.dimX; i++){
			emptyLine.push(false);
		}
		for(var j = y; j < this.dimY; j++){
			this.board[j] = this.board[j+1]
		}

		this.board[this.dimY-1] = emptyLine;
	}

	Display.prototype.createDisplay = function() {
		for(var i = this.dimY - 1; i >= 0; i--){
			var row = $("<div class=\"row\" data-row=\"" + i + "\"></div>");
			this.$el.append(row);
			for(var j = 0; j < this.dimX; j++){
				var cell = $("<div class=\"cell\" data-position=\"[" + j + "][" + i + "]\"><div>");
				row.append(cell);
			}
		}
	}

	Display.prototype.fillDisplay = function() {
		var that = this;
		for(var j = 0; j < this.dimY; j++){
			for(var i = 0; i < this.dimX; i++){
				if(this.board[j][i]){
					var color = this.board[j][i];
					this.$el.find("div[data-position=\"[" + i + "][" + j + "]\"]").addClass(color);
				} else {
					this.$el.find("div[data-position=\"[" + i + "][" + j + "]\"]").attr("class", "").addClass("cell");
				}
			}
		}

		this.currPiece.blocks().forEach(function(block){
			that.$el.find("div[data-position=\"[" + block[0] + "][" + block[1] + "]\"]").addClass(that.currPiece.color);
		})
	}
	
})(this);