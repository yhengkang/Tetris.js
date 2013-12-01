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
		this.rotation = 45;
	}

	Piece.prototype.rotate = function() {
		this.rotation -= 90;
		var that = this;
		this.deltaArr.forEach(function(delta, index){

			var oldDelta = delta[0]
			delta[0] = Math.abs(delta[1])*Math.round(Math.cos(that.rotation*Math.PI/180));
			delta[1] = Math.abs(oldDelta)*Math.round(Math.sin(that.rotation*Math.PI/180));
		});
	}

	Piece.prototype.blocks = function() {
		var blocks = [this.center];
		var that = this;
		this.deltaArr.forEach(function(delta){
			var currX = delta[0] + that.center[0]
			var currY = delta[1] + that.center[1]
			blocks.push([currX, currY])
		})
		return blocks;
	}

	// takes in +1 or -1
	Piece.prototype.moveSideways = function(dir) {
		this.center[0] += dir
	}

	// called every step of game
	Piece.prototype.moveDown = function() {
		this.center[1] -= 1;
	}

	// [[0,1],[1,0],[2,0]] L piece
	// [[1,1],[1,0],[0,-1]]

})(this);