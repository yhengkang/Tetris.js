(function(root) {
	var Tetris = root.Tetris = (root.Tetris || {});

	// var DELTA = [[0,1],[1,0],[2,0]];
	var DELTA = [ [1,Math.PI/2], [1,0], [2,0] ]

	var Lpiece = Tetris.Lpiece = function(center) {
		var clone = jQuery.extend(true, [], DELTA);
		Tetris.Piece.call(this, center, clone)
	}

	Lpiece.inherits(Tetris.Piece);

})(this);