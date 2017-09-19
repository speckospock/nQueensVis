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

	   		}

	   		play() {
					// 		this.playBook.forEach((instruction, index) => {
					setInteval(() => {
						// remove queens from the array
						// this.queens.forEach((q, index) => {
						// 	if (q.level >= instruction.level){
						// 		this.queens.splice(index, 1);
						// 	}
						// })
						//
						// this.queensOnBoard
						// 		.data(this.queens)
						//
						// this.queensOnBoard
						// 	.exit()
							// .transition()
							// .delay(2000)
							// .remove()

						// this.leftDiagonal
						// 	.transition()
						// 	.duration(500)
						// 	.attr('y', (instruction.level - 1) * 100);
						//
						//
						// this.rightDiagonal
						// 	.transition()
						// 	.delay(500)
						// 	.duration(500)
						// 	.attr('y', (instruction.level - 1) * 100);
						//
						//
						// this.row
						// 	.transition()
						// 	.delay(1000)
						// 	.duration(500)
						// 	.attr('y', (instruction.level - 1) * 100);

						const leftDiagonalSpots =  this.board.selectAll('.ldSpots')
											.data(instruction.start ? instruction.start.rd.reverse() : [])

						leftDiagonalSpots.exit().remove();

						let enter = leftDiagonalSpots
								.enter()
								.append('circle')
									.transition()
									.attr('class', d => d === '1' ? 'ldSpots' : 'none')
									.attr('cx', (d, i) => (i - 1) * 100 + 50)
									.attr('cy', (instruction.level - 2) * 100 + 50)
								.transition()
								.duration(1000)
									.attr('cx', (d, i) => (i) * 100 + 50)
									.attr('cy', (instruction.level - 1) * 100 + 50);

						setTimeout(() => {
							this.board.selectAll('.ldSpots')
								.data([])
								.exit()
								.transition()
								.duration(500)
								.remove();
						}, 2500)
						// leftDiagonalSpots
						// 		.exit()
								// .transition()
								// .delay(1000)
								// .remove();

						// if (instruction.hasOwnProperty('bit')) {
						// 	this.queens.push(instruction);
						// 	const queensOnBoard = this.board.selectAll('.queen')
						// 		.data(this.queens)
						//
						// 	queensOnBoard.exit()
						// 			.remove()
						//
						// 	queensOnBoard
						// 		.enter()
						// 			.append('circle')
						// 			.transition()
						// 			.delay(1000)
						// 			.attr('class', 'queen')
						// 			.attr('cy', data => (data.level - 1) * 100 + 50)
						// 			.attr('cx', data => data.bit * 100 + 50)
						//
						// 	}
					// 	}, 2500 * index)
					// 		})
	   		}
	   	}

	   	global.NQueenVis = NQueenVis;
	});
})(window)
