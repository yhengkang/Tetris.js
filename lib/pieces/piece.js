(function(root) {
	var Tetris = root.Tetris = (root.Tetris || {});

	Function.prototype.inherits = function (BaseClass) {
    function Surrogate () {};
    Surrogate.prototype = BaseClass.prototype;
    this.prototype = new Surrogate();
  };
  
	var Piece = Tetris.Piece = function(center, deltaArr) {
		this.center = center;
		this.deltaArr = deltaArr;
	}

	Piece.prototype.rotate = function() {
		this.deltaArr.forEach(function(delta){
			delta[1] -= Math.PI/2
		});
	}

	Piece.prototype.blocks = function() {
		var blocks = [this.center];
		var that = this;

		this.deltaArr.forEach(function(delta){
			var currX = that.center[0] + Math.round(delta[0]*Math.cos(delta[1]))
			var currY = that.center[1] + Math.round(delta[0]*Math.sin(delta[1]))
			blocks.push([currX, currY])
		})
		
		return blocks;
	}

	// takes in +1 or -1
	Piece.prototype.moveSideways = function(dir) {
		this.center[0] += dir
	}

	Piece.prototype.moveDown = function() {
		this.center[1] -= 1;
	}

})(this);