module.exports = function(instruction, nextInstruction) {
    if (instruction.bit !== undefined) {
      this.queens.push(instruction);
    }

    this.queens = this.queens.filter(q => q.level < nextInstruction.level );;
    // debugger
  	const queensOnBoard = this.board.selectAll('.queen')
  		.data(this.queens);

    this.board.selectAll('.none').data([]).exit().remove();

    queensOnBoard
      .exit()
      .remove();

    // if (instruction.bit) {
      queensOnBoard
        .enter()
        .append('circle')
          .attr('class', 'queen')
          .attr('cy', data => (data.level - 1) * 100 + 50)
          .attr('cx', data => data.bit * 100 + 50);
    // }
}
