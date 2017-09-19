/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const countNQueensSolutions = __webpack_require__(1);
const queens = __webpack_require__(2);
const leftDiagonalSpots = __webpack_require__(3);

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

						leftDiagonalSpots.call(this, instruction, nextInstruction);

					  queens.call(this, instruction);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// Shout Out to Greg Trowbridge
// for the biwise solution for the nQueens used in this project
// http://gregtrowbridge.com/a-bitwise-solution-to-the-n-queens-problem-in-javascript/


const getArrOfBitsFromNum = function(num) {
  let binary = num.toString(2);
  return binary.split('');
}

const convertBaseTenToBinary = (...args) => {
  const colOrDiag = {0: 'ld', 1: 'col', 2: 'rd'}

  return args.reduce((obj, arg, index) => {
    obj[colOrDiag[index]] = getArrOfBitsFromNum(arg);
    return obj;
  }, {});
}

 const countNQueensSolutions = function (n) {

  //Keeps track of the # of valid solutions
  var count = 0;

  //Helps identify valid solutions
  var done = Math.pow(2,n) - 1;
  var level = 1

  var solution = [];

  //Checks all possible board configurations
  var innerRecurse = function(ld, col, rd, w) {
    //All columns are occupied,
    //so the solution must be complete
    if (col === done) {
      solution.push({STATUS: '!' + done + '!'});
      count++;
      return;
    }

    solution.push({LEVEL: level})
    //Gets a bit sequence with "1"s
    //whereever there is an open "slot"
    var poss = ~(ld | rd | col);

    //Loops as long as there is a valid
    //place to put another queen.

    if (! (poss & done)) {
      solution.push({start: convertBaseTenToBinary(ld, col, rd)});
      solution.push({'STATUS': 'Dead end'} );
    }

    while ( poss & done ) {
      var bit = poss & -poss;
      poss -= bit;
      solution.push({start: convertBaseTenToBinary(ld, col, rd)});

      solution.push({bit: Math.log2(bit)});

      solution.push({end: convertBaseTenToBinary((ld|bit), col|bit, (rd|bit))})
      level++

      innerRecurse((ld|bit)>>1, col|bit, (rd|bit)<<1);
      level --;
      solution.push({LEVEL: level});
    }
  };

  innerRecurse(0,0,0);

  const flattened = [];

  let i = 0;
  let increment = true;

  while (i < solution.length) {
    if (solution[i]['LEVEL']) {
      var level = {level: solution[i]['LEVEL']};

      i++;
      if (i === solution.length) {
        break;
      }
      increment = false;
      while (!solution[i]['LEVEL']) {
        for (let key of Object.keys(solution[i])){
          level[key] = solution[i][key];
        }
        if (i < solution.length - 1) {
          i++;
        }
      }
      flattened.push(level)
    }
    if (increment) {
      i++;
    } else {
      increment = true;
    }
  }

  return flattened;
};

module.exports = countNQueensSolutions;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);