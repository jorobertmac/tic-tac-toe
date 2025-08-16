const Board = (function () {
  const board = []
  
  function newBoard (rows=3, columns=3) {
    for (let i=0; i<rows; i++) {
        board[i] = []
        for (let j=0; j<columns; j++) {
          board[i][j] = null
        }
      }
    }

  function displayBoard () {
    let countUp = 0
    const rows = board.map(row => row.map(function(sign) {
      countUp++
      return sign !== null? `[${sign}]` : `[${countUp}]`
    }).join(""))
    console.log(rows.join("\n"))
  }

  function getCurrentState () {
    return structuredClone(board)
  }

  return {
    getCurrentState,

    displayBoard,
    
    reset: newBoard,

    updateCell: function (row, column, sign) {
      board[row][column] = sign
    },

    isEmpty: function (row, column) {
      return board[row][column] === null
    },
  }
})()

const Player = (function () {
  return {
    create: function (playerName, playerSign) {
      return {
        playerName,
        playerSign
      }
    }
  }
})()

const Game = (function () {
  let playerX
  let playerO
  let playersTurn
  let gameOver

  const boardLocation = (location) => {
    switch (location) {
      case "1":
        return {row: 0, column: 0};
      case "2":
        return {row: 0, column: 1};
      case "3":
        return {row: 0, column: 2};
      case "4":
        return {row: 1, column: 0};
      case "5":
        return {row: 1, column: 1};
      case "6":
        return {row: 1, column: 2};
      case "7":
        return {row: 2, column: 0};
      case "8":
        return {row: 2, column: 1};
      case "9":
        return {row: 2, column: 2};
      default:
        break;
    }
  }

  const initialize = (function () {
    playerX = Player.create(prompt("Name of Player X"), "X")
    playerO = Player.create(prompt("Name of Player O"), "O")
    playersTurn = playerX
    gameOver = false
    Board.reset()
    Board.displayBoard()
  })

  const turn = function () {
    const mark = prompt(`${playersTurn.playerName}'s turn!\nWhat space do you want to mark with ${playersTurn.playerSign}`)
    const location = boardLocation(mark)
    if (Board.isEmpty(location.row, location.column)) {
      Board.updateCell(location.row, location.column, playersTurn.playerSign)
    }
  }

  const checkGameOver = () => {
    const b = Board.getCurrentState()
    if (
      (b[0][0] !== null && b[0][0] === b[0][1] && b[0][0] === b[0][2]) || // Row 1
      (b[1][0] !== null && b[1][0] === b[1][1] && b[1][0] === b[1][2]) || // Row 2
      (b[2][0] !== null && b[2][0] === b[2][1] && b[2][0] === b[2][2]) || // Row 3

      (b[0][0] !== null && b[0][0] === b[1][0] && b[0][0] === b[2][0]) || // Column 1
      (b[0][1] !== null && b[0][1] === b[1][1] && b[0][1] === b[2][1]) || // Column 2
      (b[0][2] !== null && b[0][2] === b[1][2] && b[0][2] === b[2][2]) || // Column 3

      (b[0][0] !== null && b[0][0] === b[1][1] && b[0][0] === b[2][2]) || // Diag. 159
      (b[0][2] !== null && b[0][2] === b[1][1] && b[0][2] === b[2][0])    // Diag. 357
    ) {
      gameOver = true
    }
  }

  const changePlayersTurn = function () {
    playersTurn === playerX ? playersTurn = playerO : playersTurn = playerX
  }

  const gameLoop = function () {
    initialize()
    while (!gameOver) {
      turn()
      Board.displayBoard()
      checkGameOver()
      changePlayersTurn()
    }
    alert(`Game Over!`)
  }

  const run = function () {
    gameLoop()
  }
  
  
  return {
    run
  }
})()