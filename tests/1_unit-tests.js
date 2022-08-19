const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver;
let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
let invalidPuzzle = 'B.5..2.84..63.12.7.2..5....A9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37';
let badPuzzle = '1.55.2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
let puzzleSolved ='135762984946381257728459613694517832812936745357824196473298561581673429269145378';

suite('Unit Tests', () => {
   
    suite('sudoku-solver class', function(){
        //#1
        test('Handles a valid puzzle string of 81 characters', function(done){   
          assert.equal(solver.validate(puzzle), true);          
          done();
        });
        //#2
        test('Handles an invalid puzzle string - (not 1-9 or .)', function(done){   
          assert.equal(solver.validChar(invalidPuzzle), false);          
          done();
        });
        //#3
        test('Logic handles a puzzle string that is not 81 characters in length', function(done){   
          assert.equal(solver.validate(invalidPuzzle), false);          
          done();
        });
        //#4
        test('Logic handles a valid row placement', function(done){  
            let row = solver.returnCoord("A1").row;            
            let col = solver.returnCoord("A1").col;
          assert.equal(solver.checkRowPlacement(puzzle, row, col, 7), true);          
          done();
        });
        //#5
        test('Logic handles an invalid row placement', function(done){  
            let row = solver.returnCoord("i1").row;            
            let col = solver.returnCoord("i1").col;
              console.log(row, col);
              console.log('solver.checkRowPlacement(puzzle, row, col, 7)', solver.checkRowPlacement(puzzle, row, col, 7));
          assert.equal(solver.checkRowPlacement(puzzle, row, col, 3), false);          
          done();
        });
        //#6
        test('Logic handles a valid column placement', function(done){  
            let row = solver.returnCoord("a2").row;            
            let col = solver.returnCoord("a2").col;
              console.log(row, col);
              console.log('solver.checkColPlacement(puzzle, row, col, 3)', solver.checkColPlacement(puzzle, row, col, 3));
          assert.equal(solver.checkColPlacement(puzzle, row, col, 3), true);          
          done();
        });
        //#7
        test('Logic handles an invalid column placement', function(done){  
            let row = solver.returnCoord("a2").row;            
            let col = solver.returnCoord("a2").col;
              console.log(row, col);
              console.log('solver.checkColPlacement(puzzle, row, col, 7)', solver.checkColPlacement(puzzle, row, col, 7));
          assert.equal(solver.checkColPlacement(puzzle, row, col, 7), false);          
          done();
        });
        //#8
        test('Logic handles a valid region (3x3 grid) placement', function(done){  
            let row = solver.returnCoord("a2").row;            
            let col = solver.returnCoord("a2").col;
              console.log(row, col);
              console.log(`solver.checkColPlacement(puzzle, row, col, 3)`, solver.checkColPlacement(puzzle, row, col, 3));
          assert.equal(solver.checkRegionPlacement(puzzle, row, col, 3), true);          
          done();
        });
        //#9
        test('Logic handles an invalid region (3x3 grid) placement', function(done){  
            let row = solver.returnCoord("a2").row;            
            let col = solver.returnCoord("a2").col;
              console.log(row, col);
              console.log(`solver.checkColPlacement(puzzle, row, col, 2)`, solver.checkColPlacement(puzzle, row, col, 2));
          assert.equal(solver.checkRegionPlacement(puzzle, row, col, 2), false);          
          done();
        });
        //#10
        test('Valid puzzle strings pass the solver', function(done){  
          assert.equal(solver.solve(puzzle), puzzleSolved);          
          done();
        });
        //#11
        test('Invalid puzzle strings fail the solver', function(done){  
          assert.equal(solver.solve(invalidPuzzle), false);          
          done();
        });
        //#12
        test('Solver returns the expected solution for an incomplete puzzle', function(done){  
          assert.equal(solver.solve(badPuzzle), false);          
          done();
        });

    });


});

