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
  let winner

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
    return location
  }

  const checkWin = (location) => {
    const b = Board.getCurrentState()
    const row = location.row
    const column = location.column

    const checkRow = function () {
      return b[row][0] === b[row][1] && b[row][0] === b[row][2]
    }

    const checkColumn = function () {
      return b[0][column] === b[1][column] && b[0][column] === b[2][column]
    }

    const checkDiagonal = function () {
      if (["11"].includes(`${row}${column}`)){
        return (b[0][0] === b[1][1] && b[0][0] === b[2][2]) || (b[0][2] === b[1][1] && b[0][2] === b[2][0])
      } else if (["00","22"].includes(`${row}${column}`)) {
        return b[0][0] === b[1][1] && b[0][0] === b[2][2]
      } else if (["02","20"].includes(`${row}${column}`)) {
        return b[0][2] === b[1][1] && b[0][2] === b[2][0]
      }
    }

    if (
      checkRow() ||
      checkColumn() ||
      checkDiagonal()
    ) {
      gameOver = true
      winner = playersTurn
      alert(`${winner.playerName} Wins`)
    }
  }

  const checkTie = () => {
    const marks = [...Board.getCurrentState()[0],...Board.getCurrentState()[1],...Board.getCurrentState()[2]]
    if (!marks.includes(null)) {
      gameOver = true
      alert("Tie Game!")
    }
  }

  const changePlayersTurn = function () {
    playersTurn === playerX ? playersTurn = playerO : playersTurn = playerX
  }

  const gameLoop = function () {
    initialize()
    while (!gameOver) {
      const location = turn()
      Board.displayBoard()
      if (checkWin(location)) break
      if (checkTie()) break
      changePlayersTurn()
    }
  }

  const run = function () {
    gameLoop()
  }
  
  
  return {
    run
  }
})()