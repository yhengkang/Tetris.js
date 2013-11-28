(function(root){
	var Tetris = root.Tetris = (root.Tetris || {});

	var DELTA = [[0,1],[1,0],[2,0]];

	var Lpiece = Tetris.Lpiece = function(center) {
		Tetris.Piece.call(this, center, DELTA)
	}

	Lpiece.inherits(Tetris.Piece);


})(this);