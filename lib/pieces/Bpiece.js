(function(root) {
	var Tetris = root.Tetris = (root.Tetris || {});

	var DELTA = [ [1, Math.PI/2], [1.4, Math.PI/4], [1, 0] ]

	var Bpiece = Tetris.Bpiece = function(center) {
		var clone = jQuery.extend(true, [], DELTA);
		Tetris.Piece.call(this, center, clone)
		this.color = "Yellow";
	}

	Bpiece.inherits(Tetris.Piece);

	Bpiece.prototype.rotate = function() {
		// does not rotate
	}


})(this);