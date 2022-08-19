const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    suite('POST request to /api/solve', function () {
        // #1
        test('Solve a puzzle with valid puzzle string: POST request to /api/solve', 
              function (done) {
          chai
            .request(server)
            .post('/api/solve')
            .send({
                puzzle:'5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'
                  })
            .end(function (err, res) {
              if (err) console.error();
             assert.equal(res.status, 200);
             console.log('res.body', res.body)
              assert.equal(res.body.solution, '568913724342687519197254386685479231219538467734162895926345178473891652851726943');
              assert.equal(res.body.text, 'solved!');
              done();
            });
        });
        // #2
        test('Solve a puzzle with missing puzzle string: POST request to /api/solve', 
              function (done) {
          chai
            .request(server)
            .post('/api/solve')
            .send({ puzzle:'' })
            .end(function (err, res) {
              if (err) console.error();
             assert.equal(res.status, 200);
             console.log('res.body', res.body)
              assert.equal(res.body.error, 'Required field missing' );
              done();
            });
        });
        // #3
        test('Solve a puzzle with invalid characters: POST request to /api/solve', 
              function (done) {
          chai
            .request(server)
            .post('/api/solve')
            .send({ puzzle:'A*.91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3' })
            .end(function (err, res) {
              if (err) console.error();
             assert.equal(res.status, 200);
             console.log('res.body', res.body)
              assert.equal(res.body.error, 'Invalid characters in puzzle' );
              done();
            });
        });
        // #4
        test('Solve a puzzle with incorrect length: POST request to /api/solve', 
              function (done) {
          chai
            .request(server)
            .post('/api/solve')
            .send({ puzzle:'.91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3' })
            .end(function (err, res) {
              if (err) console.error();
             assert.equal(res.status, 200);
             console.log('res.body', res.body)
              assert.equal(res.body.error, 'Expected puzzle to be 81 characters long' );
              done();
            });
        });
        // #5
        test('Solve a puzzle that cannot be solved: POST request to /api/solve', 
              function (done) {
          chai
            .request(server)
            .post('/api/solve')
            .send({ puzzle:'9..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3' })
            .end(function (err, res) {
              if (err) console.error();
             assert.equal(res.status, 200);
             console.log('res.body', res.body)
              assert.equal(res.body.error, 'Puzzle cannot be solved' );
              done();
            });
        });
      });

    suite('POST request to /api/check', function () {
        // #6
        test('Check a puzzle placement with all fields: POST request to /api/check', 
              function (done) {
          chai
            .request(server)
            .post('/api/check')
            .send({ puzzle :    '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3' ,
                    coordinate: 'A2', 
                    value  :    6    })
            .end(function (err, res) {
              if (err) console.error();
             assert.equal(res.status, 200);
             console.log('res.body', res.body)
              assert.equal(res.body.valid, true );
              done();
            });
        });
        // #7
        test('Check a puzzle placement with single placement conflict: POST request to /api/check', 
              function (done) {
          chai
            .request(server)
            .post('/api/check')
            .send({ puzzle :    '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3' ,
                    coordinate: 'A2', 
                    value  :    7    })
            .end(function (err, res) {
              if (err) console.error();
             assert.equal(res.status, 200);
             console.log('res.body', res.body)
              assert.equal(res.body.valid, false );
              assert.isArray(res.body.conflict, "should be array ['row'] ");
              assert.equal(res.body.conflict[0], 'row' );
              done();
            });
        });
        // #8
        test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', 
              function (done) {
          chai
            .request(server)
            .post('/api/check')
            .send({ puzzle :    '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3' ,
                    coordinate: 'A2', 
                    value  :    9    })
            .end(function (err, res) {
              if (err) console.error();
             assert.equal(res.status, 200);
             console.log('res.body', res.body)
              assert.equal(res.body.valid, false );
              assert.isArray(res.body.conflict, "should be array ['row', 'column', 'region'] ");
              assert.equal(res.body.conflict[0], 'row' );
              assert.equal(res.body.conflict.length, 3 );
              assert.isAtLeast(res.body.conflict.length, 2 );

              done();
            });
        });
        // #9
        test('Check a puzzle placement with all placement conflicts: POST request to /api/check', 
              function (done) {
          chai
            .request(server)
            .post('/api/check')
            .send({ puzzle :    '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3' ,
                    coordinate: 'A2', 
                    value  :    9    })
            .end(function (err, res) {
              if (err) console.error();
             assert.equal(res.status, 200);
             console.log('res.body', res.body)
              assert.equal(res.body.valid, false );
              assert.isArray(res.body.conflict, "should be array ['row', 'column', 'region'] ");
              assert.include(res.body.conflict, 'row' );
              assert.include(res.body.conflict, 'column' );
              assert.include(res.body.conflict, 'Region' );
              assert.equal(res.body.conflict.length, 3 );
              done();
            });
        });
        // #10
        test('Check a puzzle placement with missing required fields: POST request to /api/check', 
              function (done) {
          chai
            .request(server)
            .post('/api/check')
            .send({ puzzle :    '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3' ,
                    coordinate: '', 
                    value  :    ''   })
            .end(function (err, res) {
              if (err) console.error();
             assert.equal(res.status, 200);
             console.log('res.body', res.body)
              assert.equal(res.body.error, 'Required field(s) missing');
              done();
            });
        });
        // #11
        test('Check a puzzle placement with invalid characters: POST request to /api/check', 
              function (done) {
          chai
            .request(server)
            .post('/api/check')
            .send({ puzzle :    'A..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3' ,
                    coordinate: 'A2', 
                    value  :     6   })
            .end(function (err, res) {
              if (err) console.error();
             assert.equal(res.status, 200);
             console.log('res.body', res.body)
              assert.equal(res.body.error, 'Invalid characters in puzzle');
              done();
            });
        });
        // #12
        test('Check a puzzle placement with incorrect length: POST request to /api/check', 
              function (done) {
          chai
            .request(server)
            .post('/api/check')
            .send({ puzzle :    '..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3' ,
                    coordinate: 'A2', 
                    value  :     6   })
            .end(function (err, res) {
              if (err) console.error();
             assert.equal(res.status, 200);
             console.log('res.body', res.body)
              assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
              done();
            });
        });
        // #13
        test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', 
              function (done) {
          chai
            .request(server)
            .post('/api/check')
            .send({ puzzle :    '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3' ,
                    coordinate: 'A2u', 
                    value  :     6   })
            .end(function (err, res) {
              if (err) console.error();
             assert.equal(res.status, 200);
             console.log('res.body', res.body)
              assert.equal(res.body.error, 'Invalid coordinate');
              done();
            });
        });
        // #14
        test('Check a puzzle placement with invalid placement value: POST request to /api/check', 
              function (done) {
          chai
            .request(server)
            .post('/api/check')
            .send({ puzzle :    '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3' ,
                    coordinate: 'A2', 
                    value  :     '55'   })
            .end(function (err, res) {
              if (err) console.error();
             assert.equal(res.status, 200);
             console.log('res.body', res.body)
              assert.equal(res.body.error, 'Invalid value');
              done();
            });
        });
    });
});

