const readline = require('readline');
var readlineSync = require('readline-sync');
let rl = readline.createInterface(
		process.stdin, process.stdout
	);

let board = [[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "]];

function printBoard(board){
//Add Header
  let header = ' '
  for (let num = 1; num<board[0].length+1;num++){
    header += ' '+ num.toString() +'  '
  }
  console.log(header)
  console.log('+---'.repeat(board[0].length) + '+')

  //Add Active Game Board
  for (let row = 0; row<board.length;row++){
    console.log('|   '.repeat(board[0].length +1))
    let mid_row = ""
    for (let i = 0; i<board[0].length;i++){
        mid_row += '| ' + board[row][i] + ' '
    }
    console.log(mid_row + '|')
    console.log('|   '.repeat(board[0].length +1))
    console.log('+---'.repeat(board[0].length) + '+')
  }
}

function validColumn(board, column){
    let valid = true
    //Check column not full
    if (board[0][column-1] !== " "){
        valid = false
        console.log("Column Full!")
    }
    //Check valid column
    if (column<1 || column>7){
        valid = false
        console.log("Invalid column!")
    }
  return valid
}

function add_piece(board, piece, column){
    //Add piece to lowest empty column
    let top_empty=""
    for (let i=0;i<board.length;i++){
        if(board[i][column-1]===" " && i !== board.length-1){
            top_empty=i
        } else{
            if(board[i][column-1]===" " && i === board.length-1){
                top_empty=board.length-1
            }
            board[top_empty][column-1]=piece
            break
        }   
    }
}
function any_spaces(board){
    let empty = false
    for (let i of board[0]){
        if (i === " "){
            empty = true
        }
    }
    return empty
}

function check_fours(board, piece){
    //Horizontal fours
    for (let row = 0;row<board.length;row++){
        for (let i = 0;i<board[0].length-3;i++){
            if (board[row][i]=== piece && board[row][i+1]=== piece && board[row][i+2]=== piece && board[row][i+3]=== piece){
                return true
            }
        }
    }

    //Vertical fours
    for (let row = 0;row<board.length-3;row++){
        for (let i = 0;i<board[0].length;i++){
            if (board[row][i]=== piece && board[row+1][i]=== piece && board[row+2][i]=== piece && board[row+3][i]=== piece){
                return true
            }
        }
    }

    //Diagonal \ fours
    for (let row = 0;row<board.length-3;row++){
        for (let i = 0;i<board[0].length-3;i++){
            if (board[row][i]=== piece && board[row+1][i+1]=== piece && board[row+2][i+1]=== piece && board[row+3][i+1]=== piece){
                return true
            }
        }
    }

    //Diagonal / fours
    for (let row = 3;row<board.length;row++){
        for (let i = 0;i<board[0].length-3;i++){
            if (board[row][i]=== piece && board[row-1][i+1]=== piece && board[row-2][i+1]=== piece && board[row-3][i+1]=== piece){
                return true
            }
        }
    }

    return false
}

function game_over(board){
    return (any_spaces(board)===false || check_fours(board,"X") || check_fours(board,"O"))
}

function play_game(){
    current_board = [[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "]]

    Turn = "X"
    Winner = ""
    while(game_over(current_board)===false){
        printBoard(current_board)
        let col = readlineSync.question("It is " + Turn + "'s turn, please select a column: \n")
        while (validColumn(current_board, col) === false){
            col = readlineSync.question("Please select a valid column: \n")
        }
        add_piece(current_board, Turn, col)
        if (check_fours(current_board,Turn)){
            Winner=Turn
        }
        if (Turn==="O"){
            Turn = "X"
        }else{
            Turn = "O"
        }
    }
    printBoard(current_board)
    if(Winner==""){
        console.log("It was a tie!")
    } else{
        console.log("The winner was " + Winner + "!")
    }
    process.exit()
}

play_game()
