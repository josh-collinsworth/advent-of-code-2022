import input from './input'

const exampleInput = 
`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

const formattedInput = input.split('\n').map(row => row.split(' '))

const generateBoardSize = (moves: string[][]) => {
  let maxBoardWidth = 0
  let minBoardWidth = 0
  let maxBoardHeight = 0
  let minBoardHeight = 0
  let boardWidth = 1
  let boardHeight = 1

  moves.forEach(move => {
    let dir = move[0]
    let steps = parseInt(move[1])
    switch (dir) {
      case 'R':
        boardWidth += steps
        break;
      case 'L':  
        boardWidth -= steps
        break;
      case 'U':
        boardHeight += steps
        break;
      case 'D':
        boardHeight -= steps
        break;
    }
    minBoardHeight = Math.min(minBoardHeight, boardHeight)
    maxBoardHeight = Math.max(maxBoardHeight, boardHeight)
    minBoardWidth = Math.min(minBoardWidth, boardWidth)
    maxBoardWidth = Math.max(maxBoardWidth, boardWidth)
  })

  // console.log(minBoardHeight, maxBoardHeight, minBoardWidth, maxBoardWidth)

  return ([
    minBoardHeight, maxBoardHeight,
    minBoardWidth, maxBoardWidth
  ])
}

const generateBoard = ((rows: number, cols: number): string[][] => {
  let board: string[][] = []
  for (let row = 0; row < rows; row++) {
    board[row] = []
    for (let col = 0; col < cols; col++) {
      board[row].push('.')
    }
  }
  console.log('generated board')
  return board
})

const [rowStart, rowEnd, colStart, colEnd] = generateBoardSize(formattedInput)
const rowSize = Math.abs(rowStart) + Math.abs(rowEnd)
const colSize = Math.abs(colStart) + Math.abs(colEnd)
// const board = generateBoard(rowSize, colSize)

/**
 * ⚠️ I gave up on trying to determine the board size beforehand and just made it bigger than it would ever need to be. ¯\_(ツ)_/¯
 **/ 
const board = generateBoard(600, 600)

interface Coordinates {
  x: number
  y: number
}

const headCoords: Coordinates = { y: 300 , x: 300 }
const tailCoords: Coordinates = { y: 300 , x: 300 }

const tailGroup: Coordinates[] = [
  /* 1 */ { y: 300 , x: 300 },
  /* 2 */ { y: 300 , x: 300 },
  /* 3 */ { y: 300 , x: 300 },
  /* 4 */ { y: 300 , x: 300 },
  /* 5 */ { y: 300 , x: 300 },
  /* 6 */ { y: 300 , x: 300 },
  /* 7 */ { y: 300 , x: 300 },
  /* 8 */ { y: 300 , x: 300 },
  /* 9 */ { y: 300 , x: 300 },
]

const makeMove = (dir: string, stepCount: string) => {
  let steps = parseInt(stepCount)
  while (steps > 0) {
    switch (dir) {
      case 'R':
        headCoords.x += 1
        break;
      case 'L':
        headCoords.x -= 1
        break;
      case 'U':
        headCoords.y -= 1
        break;
      case 'D':
        headCoords.y += 1
        break;
    }
    catchUp()
    steps -= 1
    // showBoardStatus()
  }
}

const catchUp = () => {
  board[tailCoords.y][tailCoords.x] = '#'

  const onSameRow = headCoords.y === tailCoords.y
  const onSameCol = headCoords.x === tailCoords.x
  const onSameSpot = onSameRow && onSameCol
  const withinRange = (
    (Math.abs(headCoords.y - tailCoords.y) <= 1) && 
    (Math.abs(headCoords.x - tailCoords.x) <= 1)
  )

  if (onSameSpot || withinRange) return

  let moveX = 0
  let moveY = 0

  let shouldMoveX = false
  let shouldMoveY = false

  if (Math.abs(headCoords.y - tailCoords.y) > 1) {
    shouldMoveY = true
  }
  if (Math.abs(headCoords.x - tailCoords.x) > 1) {
    shouldMoveX = true
  }

  const shouldMoveBoth = (
    (shouldMoveY && Math.abs(headCoords.x - tailCoords.x) > 0) ||
    (shouldMoveX && Math.abs(headCoords.x - tailCoords.x) > 0) 
  )

  if (shouldMoveBoth) {
    if (headCoords.x > tailCoords.x) {
      moveX = +1
    } else if (headCoords.x < tailCoords.x) {
      moveX = -1
    }
    if (headCoords.y > tailCoords.y) {
      moveY = +1
    } else if (headCoords.y < tailCoords.y) {
      moveY = -1
    }
  } else if (shouldMoveX) {
    if (headCoords.x > tailCoords.x) {
      moveX = +1
    } else if (headCoords.x < tailCoords.x) {
      moveX = -1
    }
  } else if (shouldMoveY) {
    if (headCoords.y > tailCoords.y) {
      moveY = +1
    } else if (headCoords.y < tailCoords.y) {
      moveY = -1
    }
  }

  tailCoords.x += moveX
  tailCoords.y += moveY
  
  board[tailCoords.y][tailCoords.x] = '#'
}

const showBoardStatus = () => {
  const newBoard = JSON.parse(JSON.stringify([...board]))
  newBoard.forEach((row: string[], r: number) => {
    row.forEach((_: string, c: number) => {
      if (r === headCoords.y && c === headCoords.x) {
        newBoard[r][c] = 'H'
      } else if (r === tailCoords.y && c === tailCoords.x) {
        newBoard[r][c] = 'T'
      }
    })
  })
  let shownBoard = ``
  newBoard.forEach((row: string[]) => shownBoard += row.join('') + '\n')
  // console.log(shownBoard)
}

console.log('making moves…')

formattedInput.forEach(row => {
  makeMove(row[0], row[1])
})

console.log('calculating total')

// board.forEach(row => console.log(row))

const calculateTotal = (board: string[][]): number => {
  let total = 0
  board.forEach(row => {
    row.forEach(col => {
      if (col === '#') total++
    })
  })
  return total
}

console.log(calculateTotal(board))