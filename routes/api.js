'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const matrixCreator = require('../controllers/sudoku-solver.js');





module.exports = function (app) {
 // let matrixCreator = new MatrixCreator;
  let solver = new SudokuSolver();
  //console.log(solver.matrixCreator("..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."));
let matrix = [...solver.matrixCreator("..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..")];

  let solvedMatrix = solver.solve(matrix);
 console.log('solvedMatrix: ', solvedMatrix);
  
  app.route('/api/check')
    .post((req, res) => {

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body;
      console.log(req.body);
      if(!puzzle) { 
        console.log('error: Required field missing' );
        return res.json({error: 'Required field missing' });     
      }
      if(puzzle.length !=81) { 
        console.log(' error: Expected puzzle to be 81 characters long ' );
        return res.json({ error: 'Expected puzzle to be 81 characters long' });     
      }
      if(/[^1-9.]/g.test(puzzle)) { 
        console.log( 'error: Invalid characters in puzzle'  );
        return res.json({ error: 'Invalid characters in puzzle' });     
      }
      let answer = solver.solve(puzzle);
      if(!answer) {
        console.log("cannot be solved!!!")
        return res.json({ error: 'Puzzle cannot be solved' });
      } else{
       return res.json({solution: answer});
      }
    });
};
