const Gameboard = (function () {
  const board = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"]
  ]

  
  return {
    show () {
      console.log(`${board[0].join("")}\n${board[1].join("")}\n${board[2].join("")}`)
    },

    move: function (row, column, sign) {
      board[row][column] = sign
      this.show()
    },

    reset: function () {
      for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
          board[i][j] = "-"
        }
      }
    },
    validate: function () {
      
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

