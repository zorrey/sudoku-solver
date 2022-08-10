
//

class SudokuSolver {

  validate(puzzleString) {}

  isCellVoid(matrix) {
    let cells = {isZero: true, row: -1, col:-1};
    //let matrix = this.matrixCreator(puzzleString);
    //console.log(matrix);
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
          if(matrix[i][j]==0){
            cells.row = i;
            cells.col =j;
            cells.isZero = false;
            break;
          }
        }
       if(!cells.isZero)
        break ; 
    }
    return cells;

  }

  checkRowPlacement(puzzleString, row, column, value) {

  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  isUnique(matrix, row, col, num){
    //check row
    matrix[row].forEach(el => {
      if (el==num)
      return false;
    });
    //check column
    for(let r=0;r<9;r++){
      if (matrix[r][col]==num)
      return false;
    };
    //check square
    let rStart= row - row % 3;
    let cStart= col - col % 3;
    for(let i=rStart; i < rStart+3; i++){
      for(let j=rStart; j < cStart+3; j++) {
        if (matrix[i][j]==num) return false;
      }
    } 
    //if no instanses of num found
    return true;
  }

  solve(matrix) {   
   // let matrix = this.matrixCreator(puzzleString);
   // console.log("matrix 2:--", matrix)
    let row = this.isCellVoid(matrix).row;
    let col = this.isCellVoid(matrix).col;
    console.log("row , col:", row, col)
    console.log("isCellVoid:---", this.isCellVoid(matrix))

    //if(!matrix) return console.log('error: string invalid');

    if(this.isCellVoid(matrix).isZero) return true;
    
    for(let num = 1; num<=9; num++){

      if(this.isUnique(matrix, row, col, num)){
        console.log('this.isUnique(matrix, row, col, num)----', this.isUnique(matrix, row, col, num))
        //when unique in row, column and square assign the cell to the number
        matrix[row][col] = num;
        console.log('matrix[row][col]=nam--->', matrix[row][col]);
        //if all other empty cells are filled and valid sudoku is solved
        if(this.solve(matrix))
        return true;
        //else cell is back to zero and num is changed to the next option
        else
        matrix[row][col] = 0;
      }   
    }    
    return false;    
  }


matrixCreator(puzzleString){
  //if (puzzleString.length !== 81) return null;
  let arr = puzzleString.split("");
      //console.log(arr);
  let newMatrix=[];
  for ( let row=0; row<9; row++){
    newMatrix[row]=[];
    //console.log(matrix)
    for(let col=0; col<9; col++){
    if(arr[0]=='.'){
      newMatrix[row][col] = 0;
      arr.shift();
    } else
      newMatrix[row][col] = parseInt(arr.shift());      
    }
  }   
  return newMatrix;
}

matrixPrint(solvedmatrix){
  for(let i=0;i<9;i++){
    for(let j=0;j<9;j++){
      console.log(solvedmatrix[i][j] );
    }
    //console.log('\n');
  }
}

}


//console.log(matrixCreator("..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."));

module.exports = SudokuSolver;
//module.exports = matrixCreator;

