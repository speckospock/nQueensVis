module.exports = function(instruction, nextInstruction) {
  this.board.selectAll('.ldSpots')
    .data([])
      .exit()
      .remove()

  let enter = this.leftDiagonalSpots
    .data(instruction.end ? instruction.end.rd.reverse() : [])
      .enter()
      .append('circle')

  enter
        .attr('class', d => d === '1' ? 'ldSpots' : 'none')
        .attr('cx', (d, i) => i * 100 + 50)
        .attr('cy', (instruction.level - 1) * 100 + 50)

  enter
      .transition()
      .duration(1000)
        .attr('cx', (d, i) => instruction.level < nextInstruction.level ? (i + 1) * 100 + 50 : (i - 1) * 100 + 50)
        .attr('cy', instruction.level < nextInstruction.level ? instruction.level * 100 + 50 : (instruction.level - 2) * 100 + 50);
}
