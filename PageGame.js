let current_board = [[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "]]
let current_color = "red"
let current_piece = "X"
let active_game = true

//Create the circlular slots on the game board
function AddSlots(event){
    for (i=0;i<42;i++){
        let newSlot = document.createElement("section")
        newSlot.className = "key"
        newSlot.id = "slot"+i
        document.getElementsByClassName("gameBase")[0].appendChild(newSlot);
    }
}

//Create the 7 input buttons
function AddButtons(event){
    for (i=1;i<8;i++){
        let newSlot = document.createElement("section")
        newSlot.className = "key"
        newSlot.id = "Button"+i
        newSlot.innerHTML = i
        notePress(newSlot)
        document.getElementsByClassName("buttonBase")[0].appendChild(newSlot);
    }
}

window.addEventListener("load", AddSlots)
window.addEventListener("load", AddButtons)
document.getElementsByClassName("TextBase")[0].addEventListener("click",gameReset)

//Add click indicator color change on buttons
function keyPlay(event){
  event.target.style.backgroundColor = "lightgray"
}
function keyReturn(event){
  event.target.style.backgroundColor = ""
}

function notePress(note){
  note.onmousedown = keyPlay;
  note.onmouseup = keyReturn;
  note.onclick = () => progress_game(current_board,Number(note.innerHTML));
}

//Function to get color from piece name
function pieceColor(piece){
  if (piece==="X"){
    return "red"
  } else{
    return "yellow"
  }
}

//Function to check if a selected column in board array is not full
function validColumn(board, column){
    let valid = true
    //Check column not full
    if (board[0][column-1] !== " "){
        valid = false
        console.log("Column Full!")
    }

  return valid
}

//Function to add piece to lowest empty row of selected column in board array and on game display
function add_piece(board, piece, column){
    //Add piece to lowest empty row
    let top_empty=""
    for (let i=0;i<board.length;i++){
        if(board[i][column-1]===" " && i !== board.length-1){
            top_empty=i
        } else{
            if(board[i][column-1]===" " && i === board.length-1){
                top_empty=board.length-1
            }
            board[top_empty][column-1]=piece
            let entry = top_empty*7+column-1
            document.getElementById("slot"+entry).style.backgroundColor = pieceColor(piece)
            break
        }   
    }
}

//Function to check if board is completely full
function any_spaces(board){
    let empty = false
    for (let i of board[0]){
        if (i === " "){
            empty = true
        }
    }
    return empty
}

//Function to check the board array for any instances of 4 pieces in a row
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
            if (board[row][i]=== piece && board[row+1][i+1]=== piece && board[row+2][i+2]=== piece && board[row+3][i+3]=== piece){
                return true
            }
        }
    }

    //Diagonal / fours
    for (let row = 3;row<board.length;row++){
        for (let i = 0;i<board[0].length-3;i++){
            if (board[row][i]=== piece && board[row-1][i+1]=== piece && board[row-2][i+2]=== piece && board[row-3][i+3]=== piece){
                return true
            }
        }
    }

    return false
}

//Function to reset the game status, both the game board and inner variables.
function gameReset(){
  if (active_game===false){
    for (i=0;i<42;i++){
      document.getElementById("slot"+i).style.backgroundColor = "white"
    }
    current_board = [[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "]]
    current_piece = "X"
    document.getElementById("Message").innerHTML="Welcome to Connect 4! It is <a style='color: red;'>Red</a>'s turn."
    active_game=true
  }
}

//Function that tries to progress the game one state upon button press
function progress_game(board,column){
  //Check currently active game
  if (active_game===false){
    return
  }
   //If valid, add piece, if not valid, give prompt and break
  if (validColumn(board, column)===false){
    document.getElementById("Message").innerHTML="Invalid column! Select a column with empty space for <a style='color:"+pieceColor(current_piece)+";'>" +pieceColor(current_piece)[0].toUpperCase() + pieceColor(current_piece).slice(1)+"</a>."
    return
  } else{
    add_piece(board, current_piece, column)
  }
  //If piece added, check for end of game after
  if (check_fours(current_board, current_piece)){
    document.getElementById("Message").innerHTML= "<a style='color:"+pieceColor(current_piece)+";'>"+pieceColor(current_piece)[0].toUpperCase() + pieceColor(current_piece).slice(1)+"</a> has won! Click here to reset."
    active_game = false
  } else if (any_spaces(current_board)===false){
    document.getElementById("Message").innerHTML="It's a tie! Click here to reset."
    active_game = false
  } else{
    if (current_piece === "X"){
      current_piece = "O"
    } else{
      current_piece = "X"
    }
    document.getElementById("Message").innerHTML= "It is now <a style='color:"+pieceColor(current_piece)+";'>"+pieceColor(current_piece)[0].toUpperCase() + pieceColor(current_piece).slice(1)+"</a>'s turn."
}
}