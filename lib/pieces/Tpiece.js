(function(root) {
	var Tetris = root.Tetris = (root.Tetris || {});

	var DELTA = [ [1, Math.PI], [1, Math.PI/2], [1, 0] ]

	var Tpiece = Tetris.Tpiece = function(center) {
		var clone = jQuery.extend(true, [], DELTA);
		Tetris.Piece.call(this, center, clone)
		this.color = "Purple";
	}

	Tpiece.inherits(Tetris.Piece);

})(this);