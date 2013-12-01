(function(root){
	var Tetris = root.Tetris = (root.Tetris || {});

	var DELTA = [[0,1],[1,0],[2,0]];
	// var DELTACLONE = jQuery.extend(true, [], DELTA);

	var Lpiece = Tetris.Lpiece = function(center) {
		var clone = jQuery.extend(true, [], DELTA);
		Tetris.Piece.call(this, center, clone)
	}

	Lpiece.inherits(Tetris.Piece);


})(this);