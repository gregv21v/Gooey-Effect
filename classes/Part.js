/*
  The part is the basic unity of a gooey substance

  After this --> Work on Paporize
*/


function Part(world, drawing, position) {
  this.world = world;
  this.selected = false;
  this.position = position;
  this.width = 30
  this.height = 100
  this.graphic = drawing.rect(this.width, this.height)
                        .move(position.x, position.y)
                        .stroke({color: "blue", width: 1})
                        .attr({fill: "blue"});

  // Gooey point are where goe.
  this.gooeyPoints = {
      left: [],
      right: [],
      up: [],
      down: []
  };
  this.connections = {}

  var self = this;
  this.graphic.on("mousedown", function() {
    self.selected = true;
  })

}



Part.prototype.moveTo = function (x, y) {
  var delta = {
    x: x - this.position.x,
    y: y - this.position.y
  }
  this.position = {
    x: x,
    y: y
  }
  this.graphic.move(x, y);

  // ****** Move Connections ****** //

  // move gooey points
  for(var side in this.gooeyPoints) {
    var points = this.gooeyPoints[side];
    for(var i = 0; i < points.length; i++) {
      // move relative to position
      points[i].x += delta.x;
      points[i].y += delta.y;
    }
  }

  // update connection
  for(var side in this.connections) {
    this.world.getConnection(this.connections[side]).updateLines();
  }
};


Part.prototype.generatePoints = function (side) {
  // within the range
  var min = 0
  var max = 0
  var points = [];
  if(side === "left" || side === "right") // vertical
  {
    min = this.position.y;
    max = this.position.y + this.height;
  }
  else if(side === "up" || side === "down") // horizontal
  {
    min = this.position.x;
    max = this.position.x + this.width;
  }

  for(var i = 0; i < 5; i++) {
    var newPoint = {}

    if(side === "left") {
      newPoint.y = getRandomInt(min, max)
      newPoint.x = this.position.x
    } else if(side === "right") {
      newPoint.y = getRandomInt(min, max)
      newPoint.x = this.position.x + this.width
    } else if(side === "up") {
      newPoint.y = this.position.y
      newPoint.x = getRandomInt(min, max)
    } else if(side === "down") {
      newPoint.y = this.position.y + this.height
      newPoint.x = getRandomInt(min, max)
    }
    points.push(newPoint)
  }
  return points;
};



Part.prototype.connect = function (drawing, part, side) {
  /*
    this, other

    with 'this'
      create a random set of gooey points

    with 'other'
      create a random set of gooey points

    Take each gooey point in 'this' and attach it
    to a random point in 'other' without two points
    connecting to the same point.

    Connection: (world object)
      Visual representation of connecting gooey points
      Data representation of connecting gooey points
      Gooey points for both Parts involved
  */

  // Generate gooey points
  this.gooeyPoints[side] = this.generatePoints(side);
  part.gooeyPoints[getOpposite(side)] = part.generatePoints(getOpposite(side));

  var newConnection = new Connection(drawing, this, part, side, getOpposite(side));
  var index = this.world.addConnection(newConnection);

  this.connections[side] = index;
  part.connections[getOpposite(side)] = index;
};
