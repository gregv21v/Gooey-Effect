// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


/*
  Gets the opposite of the given side
*/
function getOpposite(side) {

  if(side === "left") {
    return "right"
  } else if(side === "right") {
    return "left"
  } else if(side === "up") {
    return "down"
  } else if(side === "down") {
    return "up"
  } else {
    return "";
  }

}


/*
  A function used for sorting coordinates
  by their y value. This function should be
  passed to array.sort.
*/
function sortByY(a, b) {
  if(a.y > b.y)
    return 1

  if(a.y < b.y)
    return -1

  return 0
}

/*
  A function used for sorting coordinates
  by their x value. This function should be
  passed to array.sort.
*/
function sortByX(a, b) {
  if(a.x > b.x)
    return 1

  if(a.x < b.x)
    return -1

  return 0
}


/*
  Generates an array with numbers from min to max inclusive
*/
function range(min, max) {
  var range = [];
  for(var i = min; i <= max; i++) {
    range.push(i);
  }
  return range;
}
