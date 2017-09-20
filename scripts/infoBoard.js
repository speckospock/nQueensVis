module.exports = function(instruction) {
  if (instruction.STATUS === "Dead end") {
    document.getElementById('alert').innerHTML = "Dead end";
  } else if (instruction.STATUS === "!SOLUTION!") {
    document.getElementById('alert').innerHTML = "Solution";
  } else {
    document.getElementById('alert').innerHTML = "Chilling";
  }

  document.getElementById('bit').innerHTML = instruction.bit ? instruction.bit.toString(2) : 'pending';
  document.getElementById('start').innerHTML = instruction.start ? instruction.start : 'pending';
  document.getElementById('end').innerHTML = instruction.end ? instruction.end : 'pending';
}
