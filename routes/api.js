'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
//const matrixCreator = require('../controllers/sudoku-solver.js');





module.exports = function (app) {
  
  let solver = new SudokuSolver();
    
  app.route('/api/check')
    .post((req, res) => {
      console.log("req.body - check:", req.body);
      const {puzzle, coordinate, value} = req.body;
      if(!solver.validate(puzzle)) return res.json({ error: 'Expected puzzle to be 81 characters long' })

      

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body;
      //console.log('req.body: ', req.body);
      if(!puzzle) { 
        console.log('error: Required field missing' );
        return res.json({error: 'Required field missing' });     
      }
      if(!solver.validate(puzzle)) { 
        console.log(' error: Expected puzzle to be 81 characters long ' );
        return res.json({ error: 'Expected puzzle to be 81 characters long' });     
      }
      if(/[^1-9.]/g.test(puzzle)) { 
        console.log( 'error: Invalid characters in puzzle'  );
        return res.json({ error: 'Invalid characters in puzzle' });     
      }
     // let datapuzzle = [...solver.matrixCreator(puzzle)];
      let answer = solver.solve(puzzle);
      
      console.log('solver.solve(puzzle): ', solver.solve(puzzle))
      //console.log('answer: ', answer)
      if(!answer) {
        console.log("cannot be solved!!!")
        return res.json({ error: 'Puzzle cannot be solved' });
      } else{
        console.log('solved!');
       return res.json({solution: answer,
                          text: "solved!"});
      }
    });
};
