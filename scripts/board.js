document.addEventListener("DOMContentLoaded", function(e) {
   	const board = d3.select('#board').append('svg').attr('class', 'board');

   	class NQueenVis {
   		constructor(n){
   			this.size = n;
   			this.queens = [];
   			this.playBook = countNQueensSolutions(n);
   			this.currentLevel = 1;
   			this.row = board.append('rect')
   				   	.attr('y', '0')
				   	.attr('width', '400')
				   	.attr('height', '100')
				   	.attr('fill', 'green');
   		}

   		play() {
   			this.playBook.forEach((instruction, index) => {
				setTimeout(() => {
					this.queens.forEach((q, index) => {
						if (q.level >= instruction.level){
							this.queens.splice(index, 1);
						}
					})
					this.currentLevel = instruction.level;
					this.row
						.transition()
						.duration(200)
						.attr('y', (instruction.level - 1) * 100);

					if (instruction.hasOwnProperty('bit')) {
						this.queens.push(instruction);
						const queensOnBoard = board.selectAll('circle')
							.data(this.queens)

						queensOnBoard.exit().remove()

						queensOnBoard
							.enter()
								.append('circle')
								.attr('class', 'queen')
								.attr('cy', data => (data.level - 1) * 100 + 50)
								.attr('cx', data => data.bit * 100 + 50)

					}
				}, 1000 * index)
   			})
   		}

   	}

   	window.NQueenVis = NQueenVis;
});