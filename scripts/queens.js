module.exports = function(instruction) {
  	this.queens.push(instruction);
  	const queensOnBoard = this.board.selectAll('.queen')
  		.data(this.queens)

  	queensOnBoard.exit()
  			.remove()

  	queensOnBoard
  		.enter()
  			.append('circle')
  			.attr('class', 'queen')
  			.attr('cy', data => (data.level - 1) * 100 + 50)
  			.attr('cx', data => data.bit * 100 + 50)
}
