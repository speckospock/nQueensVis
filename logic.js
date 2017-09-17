((global) => {
  countNQueensSolutions = function(n) {

    //Keeps track of the # of valid solutions
    var count = 0;

    //Helps identify valid solutions
    var done = Math.pow(2,n) - 1;
    var level = 1

    //Checks all possible board configurations
    var innerRecurse = function(ld, col, rd) {


      //All columns are occupied,
      //so the solution must be complete
      if (col === done) {
        console.log('!!!!!!!!!!!!!!!!!!!' + done + '!!!!!!!!!!!!!!!!!!!')
        count++;
        return;
      }

      console.log('LEVEL: ' + level + '***********************')
      //Gets a bit sequence with "1"s
      //whereever there is an open "slot"
      var poss = ~(ld | rd | col);

      //Loops as long as there is a valid
      //place to put another queen.

      if (! (poss & done)) {
        console.log('ld: ' + (ld).toString(2) + ', col: ' + (col).toString(2) + ', rd: ' +  (rd).toString(2))
        console.log('Dead end ************************')
      }

      while ( poss & done ) {
        var bit = poss & -poss;
        poss -= bit;
        console.log('ld: ' + (ld).toString(2) + ', col: ' + (col).toString(2) + ', rd: ' +  (rd).toString(2))
        console.log('bit: ' + bit.toString(2))
        console.log('ld: ' + (ld|bit).toString(2) + ', col: ' + (col|bit).toString(2) + ', rd: ' +  (rd|bit).toString(2))
        level ++

        innerRecurse((ld|bit)>>1, col|bit, (rd|bit)<<1);
        level --
        console.log('LEVEL: ' + level + '***********************')
      }
    };

    innerRecurse(0,0,0);

    return count;
  };

  // global.countNQueensSolutions = countNQueensSolutions;
})()

