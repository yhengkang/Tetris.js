(function(root){
	var Tetris = root.Tetris = (root.Tetris || {});

	var DELTA = [[-1,1],[0,1],[1,0]];

	var Zpiece = Tetris.Zpiece = function(center) {
		var clone = jQuery.extend(true, [], DELTA);
		Tetris.Piece.call(this, center, clone)
	}

	Zpiece.inherits(Tetris.Piece);

})(this);