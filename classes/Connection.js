function Connection(drawing, part1, part2, side1, side2) {
  // connnection rects
  this.lines = []
  this.pointPairs = []
  this.part1 = {
    part: part1,
    side: side1
  }
  this.part2 = {
    part: part2,
    side: side2
  }

  // create the connections between gooey points

  /* Connect points in a random order
  var indicesPart1 = range(0, part1.gooeyPoints[side1].length-1);
  var indicesPart2 = range(0, part2.gooeyPoints[side2].length-1);
  for(var i = 0; i < indicesPart1.length; i++) {
    var newPointPair = [indicesPart1[i]];

    // take a gooey point from the pool
    var index = getRandomInt(0, indicesPart2.length);
    newPointPair.push(indicesPart2[index]);
    indicesPart2.splice(index, 1);

    this.pointPairs.push(newPointPair);
  }
  */

  /* Connect points to each other one by one (0, 0), (1, 1) ... etc */
  // Sort points by height in world.
  part1.gooeyPoints[side1].sort(sortByY);
  part2.gooeyPoints[side2].sort(sortByY);

  for(var i = 0; i < part1.gooeyPoints[side1].length; i++) {
    this.pointPairs.push([i, i])
  }

  // create the lines connecting the gooey points
  for(var i = 0; i < this.pointPairs.length; i++) {
    var pair = this.pointPairs[i]
    var newLine = drawing.line(
                            part1.gooeyPoints[side1][pair[0]].x,
                            part1.gooeyPoints[side1][pair[0]].y,
                            part2.gooeyPoints[side2][pair[1]].x,
                            part2.gooeyPoints[side2][pair[1]].y
                          )
                         .stroke({color: "blue", width: 2})

    this.lines.push(newLine);
  }

}


Connection.prototype.updateLines = function () {
  for(var i = 0; i < this.lines.length; i++) {
    var pair = this.pointPairs[i];
    this.lines[i].plot(
                        this.part1.part.gooeyPoints[this.part1.side][pair[0]].x,
                        this.part1.part.gooeyPoints[this.part1.side][pair[0]].y,
                        this.part2.part.gooeyPoints[this.part2.side][pair[1]].x,
                        this.part2.part.gooeyPoints[this.part2.side][pair[1]].y
                      )
  }
};
