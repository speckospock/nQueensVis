module.exports = function(instruction, nextInstruction, prevInstruction) {
  this.board.selectAll('.ldSpots')
    .data([])
      .exit()
      .remove()

  let data = [];

  if (nextInstruction.level > instruction.level && instruction.end) {
    data = instruction.end.rd.reverse()
  } else {
    data = instruction.end.rd;
  }
  // else if (nextInstruction.level < instruction.level && instruction.start) {
  //   data = instruction.start.rd.reverse()
  // }
  // else if (nextInstruction.level < instruction.level ) {
  //   data = instruction.start.rd.reverse()
  // }

  let enter = this.leftDiagonalSpots
    .data(data)
      .enter()
      .append('circle')

  enter
        .attr('class', d => d === '1' ? 'ldSpots' : 'none')
        .attr('cx', (d, i) => instruction.level < nextInstruction.level ? i * 100 + 50 : (i + 1) * 100 + 50)
        .attr('cy', (instruction.level - 1) * 100 + 50)

  if (instruction.level < nextInstruction.level) {

  }
  enter
      .transition()
      .duration(1000)
        .attr('cx', (d, i) => instruction.level < nextInstruction.level ? (i + 1) * 100 + 50 : i * 100 + 50)
        .attr('cy', instruction.level < nextInstruction.level ? instruction.level * 100 + 50 : (instruction.level - 2) * 100 + 50);
}
