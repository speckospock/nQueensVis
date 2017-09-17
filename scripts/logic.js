// Shout Out to Greg Trowbridge
// for the biwise solution for the nQueens used in this project
// http://gregtrowbridge.com/a-bitwise-solution-to-the-n-queens-problem-in-javascript/

((global) => {
 countNQueensSolutions = function(n) {

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
        solution.push({start: {
                 ld:  ld.toString(2),
                 col: col.toString(2),
                 rd:  rd.toString(2)}
                });
        solution.push({'STATUS': 'Dead end'} );
      }

      while ( poss & done ) {
        var bit = poss & -poss;
        poss -= bit;
        solution.push({start: {
                         ld:  ld.toString(2),
                         col: col.toString(2),
                         rd:  rd.toString(2)}
                        });

        solution.push({bit: Math.log2(bit)});

        solution.push({end: {
          ld:(ld|bit).toString(2),
          col: (col|bit).toString(2),
          rd: (rd|bit).toString(2)
        }})
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

  global.countNQueensSolutions = countNQueensSolutions;
})(window)

