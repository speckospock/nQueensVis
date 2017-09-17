document.addEventListener("DOMContentLoaded", function(e) {
   	const board = d3.select('#board').append('svg').attr('class', 'board');
   	const whites = [];

   	class NQueenVis {
   		constructor(n){
   			this.size = n;
   			this.queens = [];
   			this.playBook = countNQueensSolutions(n);
   			this.currentLevel = 1;
			board.attr('width', 100 * n).attr('height', 100 * n);

			for (let r = 0; r < n; r++) {
				for (let c = 0; c < n; c++) {
					if ( (r + c)%2) {
						whites.push({x: r * 100, y: c * 100});
					}
				}
			}

			board.selectAll('.block')
				.data(whites)
				.enter()
				.append('rect')
				.attr('class', 'block')
				.attr('x', d => d.x)
				.attr('y', d => d.y);

   			this.row = board.append('rect')
   				   	.attr('y', '0')
				   	.attr('width', 100 * n)
				   	.attr('class', 'row')

   		}

   		play() {
   			this.playBook.forEach((instruction, index) => {
				setTimeout(() => {
					this.queens.forEach((q, index) => {
						if (q.level >= instruction.level){
							this.queens.splice(index, 1);
						}
					})

					const queensOnBoard = board.selectAll('circle')
							.data(this.queens)

					queensOnBoard.exit()
							// .transition()
							// .delay(200)
							.remove()

					debugger;

					this.row
						.transition()
						.duration(200)
						.attr('y', (instruction.level - 1) * 100);

					if (instruction.hasOwnProperty('bit')) {
						this.queens.push(instruction);
						const queensOnBoard = board.selectAll('circle')
							.data(this.queens)

						queensOnBoard.exit()
								// .transition()
								// .delay(200)
								.remove()

						queensOnBoard
							.enter()
								.append('circle')
								.transition()
								.delay(200)
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