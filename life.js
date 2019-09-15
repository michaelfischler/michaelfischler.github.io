var life = [];

life.neighbors = [];

life.neighbors.add = function(x, y, v) {
  for (var i = x - 1; i <= x + 1; i++) {
    for (var j = y - 1; j <= y + 1; j++) {
      this[i * life.size + j] += v;
    }
  }
  this[x * life.size + y] -= v;
};

life.reset = function(source) {
  if (!arguments.length) {
    source = [];
    source.size = 150;
    for (var x = 0, p = 0; x < source.size; x++) {
      for (var y = 0; y < source.size; y++, p++) {
        source[p] = Math.random() > .5 ? 1 : 0;
      }
    }
  }
  life.size = source.size;
  for (var x = 0, p = 0; x < life.size; x++) {
    for (var y = 0; y < life.size; y++, p++) {
      life[p] = source[p];
      life.neighbors[p] = 0;
    }
  }
  for (var x = 0, p = 0; x < life.size; x++) {
    for (var y = 0; y < life.size; y++, p++) {
      if (life[p]) {
        life.neighbors.add(x, y, 1);
      }
    }
  }
};

life.update = function() {
  var neighbors = this.neighbors.concat();
  for (var x = 0, p = 0; x < life.size; x++) {
    for (var y = 0; y < life.size; y++, p++) {
      if (this[p]) {
        if ((neighbors[p] < 2) || (neighbors[p] > 3)) {
          this.neighbors.add(x, y, -1);
          this[p] = 0;
        }
      } else if (neighbors[p] == 3) {
        this.neighbors.add(x, y, 1);
        this[p] = 1;
      }
    }
  }
};