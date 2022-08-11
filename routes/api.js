'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const matrixCreator = require('../controllers/sudoku-solver.js');





module.exports = function (app) {
  
  let solver = new SudokuSolver();
    
  app.route('/api/check')
    .post((req, res) => {

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body;
      console.log('req.body: ',req.body);
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
      let datapuzzle = [...solver.matrixCreator(puzzle)];
      let answer = solver.solve(datapuzzle);
      
      console.log('solver.solve(datapuzzle): ', solver.solve(datapuzzle))
      console.log('answer: ', answer)
      if(!answer) {
        console.log("cannot be solved!!!")
        return res.json({ error: 'Puzzle cannot be solved' });
      } else{
       return res.json({solution: solver.stringReturn(answer)});
      }
    });
};
