(function(root) {
	var Tetris = root.Tetris = (root.Tetris || {});

	var DELTA = [ [1, Math.PI/2], [1, Math.PI], [2, Math.PI] ]

	var InvLpiece = Tetris.InvLpiece = function(center) {
		var clone = jQuery.extend(true, [], DELTA);
		Tetris.Piece.call(this, center, clone)
		this.color = "DarkOrange";
	}

	InvLpiece.inherits(Tetris.Piece);

})(this);