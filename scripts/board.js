const countNQueensSolutions = require('./logic');
const queens = require('./queens');
const leftDiagonalSpots = require('./leftDiagonalSpots');

((global) => {

	document.addEventListener("DOMContentLoaded", function(e) {

	   	class NQueenVis {
	   		constructor(n){
					this.n = n;
					this.playBook = countNQueensSolutions(n);
	   			this.board = d3.select('#board')
	   				.append('svg')
	   					.attr('class', 'board')
	   					.attr('width', 100 * n)
	   					.attr('height', 100 * n);
	   			this.queens = [];
					this.queensOnBoard = this.board.selectAll('.queen');
	   			this.currentLevel = 1;
	   			this.whites = [];
					this.stack = [];

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

					// 		this.leftDiagonal = this.board
	   		// 							.append('rect')
	   		// 							.attr('class', 'row leftDiagonal')
	   		// 							.attr('width', 100 * n)
					// 		this.rightDiagonal = this.board
	   		// 							.append('rect')
	   		// 							.attr('class', 'row rightDiagonal')
	   		// 							.attr('width', 100 * n)

					// 		this.row = this.board.append('rect')
	   		// 		  .attr('y', '0')
					//    	.attr('width', 100 * n)
					//    	.attr('class', 'row')

					this.leftDiagonalSpots = this.board.selectAll('.ldSpots');
	   		}

	   		play() {
					let step = 0;

					const loop = setInterval(() => {
						let instruction = this.playBook[step];
						const nextInstruction = this.playBook[step + 1];
						const prevInstruction = this.playBook[step - 1];

						if (instruction.level < nextInstruction.level) {
							this.stack.push(instruction);
							// debugger
						} else {
							const popped = this.stack.pop()
							// instruction.start = popped.start;
							if (instruction.end === undefined) {
								instruction.end = popped.end;
							}
							// debugger
						}

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

						leftDiagonalSpots.call(this, instruction, nextInstruction, prevInstruction);

					  queens.call(this, instruction, nextInstruction);

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
