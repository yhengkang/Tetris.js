(function(root) {
	var Tetris = root.Tetris = (root.Tetris || {});

	var DELTA = [ [1.4, 3*Math.PI/4], [1, Math.PI/2], [1,0] ];

	var Zpiece = Tetris.Zpiece = function(center) {
		var clone = jQuery.extend(true, [], DELTA);
		Tetris.Piece.call(this, center, clone);
		this.color = "Red";
	}

	Zpiece.inherits(Tetris.Piece);

})(this);