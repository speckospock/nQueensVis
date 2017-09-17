document.addEventListener("DOMContentLoaded", function(e) {
   	const board = d3.select('#board').append('svg').attr('class', 'board');

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
});