const countNQueensSolutions = require('./logic');

((global) => {


	document.addEventListener("DOMContentLoaded", function(e) {

	   	class NQueenVis {
	   		constructor(n){
					this.playBook = countNQueensSolutions(n);
	   			this.board = d3.select('#board')
	   				.append('svg')
	   					.attr('class', 'board')
	   					.attr('width', 100 * n)
	   					.attr('height', 100 * n);
	   			this.queens = [];
					this.queensOnBoard = this.board.selectAll('.queen');
	   			this.currentLevel = 1;
	   			this.whites = []; // draws white blocks on board

					for (let r = 0; r < n; r++) {
						for (let c = 0; c < n; c++) {
							if ( (r + c)%2) {
								this.whites.push({x: r * 100, y: c * 100});
							}
						}
					}

					this.board.selectAll('.block')
						.data(this.whites)
						.enter()
						.append('rect')
							.attr('class', 'block')
							.attr('x', d => d.x)
							.attr('y', d => d.y);

	   			this.leftDiagonal = this.board
	   									.append('rect')
	   									.attr('class', 'row leftDiagonal')
	   									.attr('width', 100 * n)
	   			this.rightDiagonal = this.board
	   									.append('rect')
	   									.attr('class', 'row rightDiagonal')
	   									.attr('width', 100 * n)

	   			this.row = this.board.append('rect')
	   				  .attr('y', '0')
					   	.attr('width', 100 * n)
					   	.attr('class', 'row')

					this.leftDiagonalSpots = this.board.selectAll('.ldSpots');
	   		}

	   		play() {
					let step = 0;

					const loop = setInterval(() => {
						const instruction = this.playBook[step];
						const nextInstruction = this.playBook[step + 1];

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

						step++;

						if (step === this.playBook.length - 1) {
							clearInterval(loop);
						}
	   			}, 2000);
				}
	   	}

	   	global.NQueenVis = NQueenVis;
	});
})(window)
