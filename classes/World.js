function World() {
  this.parts = []
  this.selectedPart = null
  this.connections = [];

  var self = this;
  SVG.on(window, "mousedown", function() {
    // find the newly selected part if one exists
    for(var i = 0; i < self.parts.length; i++) {
      if(self.parts[i].selected == true) {
        self.selectedPart = self.parts[i];
      }
    }
  })

  SVG.on(window, "mouseup", function() {
    if(self.selectedPart) {
      self.selectedPart.selected = false;
      self.selectedPart = null;
    }
  })

  SVG.on(window, "mousemove", function(evnt) {
    if(self.selectedPart) {
      self.selectedPart.moveTo(
        evnt.clientX - 15,
        evnt.clientY - 50
      );

      // If this rectangle is connected to another

    }
  })
}


World.prototype.addPart = function (part) {
  this.parts.push(part)
};

World.prototype.addConnection = function (connection) {
  this.connections.push(connection);
  return this.connections.length-1;
};

World.prototype.getConnection = function (index) {
  return this.connections[index];
};
