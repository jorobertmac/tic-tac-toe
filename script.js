const Board = (function () {
  const board = []
  newBoard()
  
  function newBoard (rows=3, columns=3) {
    for (let i=0; i<rows; i++) {
        board[i] = []
        for (let j=0; j<columns; j++) {
          board[i][j] = null
        }
      }
    }

  function displayBoard () {
    const rows = board.map(row => row.map(function(sign) {
      return sign !== null? `[${sign}]` : `[ ]`
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

// const Game = (function () {
//   return {
//     playerX = Player.create(nameX, "X")
//     playerO = Player.create(nameO, "O")

//   }
// })()