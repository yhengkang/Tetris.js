(function(root) {
	var Tetris = root.Tetris = (root.Tetris || {});

	var DELTA = [ [1, Math.PI/2], [2, Math.PI/2], [1, 3*Math.PI/2] ]

	var Ipiece = Tetris.Ipiece = function(center) {
		var clone = jQuery.extend(true, [], DELTA);
		Tetris.Piece.call(this, center, clone)
		this.color = "Aqua";
	}

	Ipiece.inherits(Tetris.Piece);

})(this);