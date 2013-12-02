(function(root) {
	var Tetris = root.Tetris = (root.Tetris || {});

	var DELTA = [ [1.4, Math.PI/4], [1, Math.PI/2], [1, Math.PI] ];

	var InvZpiece = Tetris.InvZpiece = function(center) {
		var clone = jQuery.extend(true, [], DELTA);
		Tetris.Piece.call(this, center, clone);
		this.color = "Lime";
	}

	InvZpiece.inherits(Tetris.Piece);

})(this);