document.addEventListener("DOMContentLoaded", function(e) {
   const board = d3.select('#board').append('svg').attr('class', 'board');

   // const row =

   // const queens = [];

   // const actions = {
   // 	'LEVEL': () {

   // 	}
   // }

   	class NQueenVis {
   		constructor(n){
   			this.size = n;
   			this.playBook = countNQueensSolutions(n);
   			this.currentLevel = 1;
   			this.row = board.append('rect')
   				   	.attr('y', '0')
				   	.attr('width', '400')
				   	.attr('height', '100')
				   	.attr('fill', 'green');
   			this.action = {
   				'LEVEL': (goToLevel, index) => {
   					setTimeout(() => {
   						this.currentLevel = this.playBook[index].LEVEL
   						this.row
   							.transition()
   							.duration(200)
   							.attr('y', (this.currentLevel -1) * 100);
   						}, 300 * index)
   					// if (this.currentLevel < this.playBook[index].LEVEL) {

   					// } else {

   					// }
   				}
   			}
   		}

   		play() {
   			this.playBook.forEach((line, index) => {
   				if (line['LEVEL']){
	   				this.action['LEVEL'](line, index);
   				}
   				// console.log(line)
   			})
   		}

   	}

   	window.NQueenVis = NQueenVis;
   	// var rowNum = 1

   	// solution.forEach((instr, index) => {
   	// 	if (instr['LEVEL']) {
   	// 		if (instr['LEVEL'] < rowNum) {
   	// 			queens.pop()
   	// 		}

	   // 		setTimeout(() => {
	   // 			rowNum = instr.LEVEL;
	   // 			row.attr('y', (instr.LEVEL - 1) * 100);
	   // 		}, 300 * index)

	   // 		if (solution[index + 2] && solution[index + 2]['bit']) {
	   // 			queens.push({'cy': solution[index + 2]['bit'] * 100 - 50, 'cx': rowNum * 100 - 50})

	   // 			board.selectAll('circle')
	   // 				.data(queens)
	   // 				.enter()
	   // 				.append('circle')
	   // 					.attr('class', 'queen')
	   // 					.attr('cx', q => q.cx)
	   // 					.attr('cy', q => q.cy)

		  //  		setTimeout(() => {
		  //  			queens.pop()
		  //  			// queen
		  //  			// 	.transition()
		  //  			// 	.duration(200)
		  //  			// 	.attr('cx', (instr.bit) * 100 + 50 )
		  //  			// 	.attr('cy', rowNum * 100 + 50);
		  //  		}, 300 * index)
	   // 		}
   	// 	}
   	// })
});