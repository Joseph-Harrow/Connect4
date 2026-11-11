board = [[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "]]


def print_board(board):
  #Add Header
  header = ' '
  for num in range(1, len(board[0]) + 1):
      header += ' '+ str(num) +'  '
  print(header)
  print('+---' * (len(board[0])) + '+')

  #Add Active Game Board
  for row in range(len(board)):
    print('|   ' * (len(board[0]) +1))
    mid_row = ""
    for i in range(len(board[0])):
      mid_row += '| ' + str(board[row][i]+ ' ')
    print(mid_row + '|')
    print('|   ' * (len(board[0]) +1))
    print('+---' * (len(board[0])) + '+')

def valid_column(board, column):
  valid = True
  #Check column not full
  if board[0][column-1] != " ":
    valid = False
    print("Column Full!")
  #Check valid column
  if column < 1 or column > 7:
    print("Invalid column!")
    valid = False

  return valid

def add_piece(board, piece, column):
  #Check valid column
  if column < 1 or column > 7:
    print("Invalid column!")
    return

   #Check valid column
  if piece != "X" and piece != "O":
    print("Invalid column!")
    return
  
  #Check column not full
  if board[0][column-1] != " ":
    print("Column Full!")
    return
  
  #Add piece to lowest empty column
  top_empty=""
  for i in range(len(board)):
    #print(i)
    if board[i][column-1]==" " and i !=len(board)-1:
      top_empty=i
      #print(top_empty)
    else:
      if board[i][column-1]==" " and i == len(board)-1:
        top_empty=len(board)-1
      #print(top_empty)
      #print(column-1)
      board[top_empty][column-1]=piece
      break

def any_spaces(board):
  empty = False
  for i in board[0]:
    if i == " ":
      empty = True
  return empty

def check_fours(board, piece):
  #Horizontal fours
  for row in range(len(board)):
    for i in range(len(board[0])-3):
      if board[row][i]== piece and board[row][i+1]== piece and board[row][i+2]== piece and board[row][i+3]== piece:
        return True
  
  #Vertical fours
  for row in range(len(board)-3):
    for i in range(len(board[0])):
      if board[row][i]== piece and board[row+1][i]== piece and board[row+2][i]== piece and board[row+3][i]== piece:
        return True
  
  #Diagonal \ Slope fours
  for row in range(len(board)-3):
    for i in range(len(board[0])-3):
      if board[row][i]== piece and board[row+1][i+1]== piece and board[row+2][i+2]== piece and board[row+3][i+3]== piece:
        return True

  #Diagonal / Slope fours
  for row in range(3,len(board)):
     for i in range(len(board[0])-3):
      if board[row][i]== piece and board[row-1][i+1]== piece and board[row-2][i+2]== piece and board[row-3][i+3]== piece:
        return True
  return False

def game_over(board):
  return not(any_spaces(board)) or check_fours(board,"X") or check_fours(board,"O")

#Test Inputs
# add_piece("O",1)
# add_piece("X",1)
# add_piece("X",1)
# add_piece("X",1)
# add_piece("X",1)
# add_piece("O",4)
# add_piece("O",1)
# add_piece("O",2)
# add_piece("O",5)
# add_piece("O",3)
# add_piece("X",7)
# add_piece("X",8)
# print_board()
# print(check_fours(board, "O"))
# print(check_fours(board, "X"))


def play_game():
  current_board = [[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "]]

  Turn = "X"
  Winner = ""
  while(not game_over(current_board)):
    print_board(current_board)
    col = int(input("It is " + Turn + "'s turn, please select a column: \n" ))
    while valid_column(current_board, col) == False:
      col = int(input("Please select a valid column: \n"))
    
    add_piece(current_board, Turn, col)
    if check_fours(current_board,Turn):
      Winner = Turn
    
    if Turn == "O":
      Turn = "X"
    else:
      Turn = "O"
  print_board(current_board)
  if Winner == "":
    print("It was a tie!")
  else:
    print("The winner was " + Winner + "!")

play_game()