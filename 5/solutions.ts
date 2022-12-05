import { formattedMoves, formattedStacks } from './inputFormatter'

let stacks = [...formattedStacks]
let stacks2 = [...formattedStacks]
let moves = formattedMoves

const removeItemFromStack = (column: number) => {
  for (let i = 0; i < stacks.length; i++) {
    if (stacks[i][column]) {
      const removedItem = stacks[i][column]
      stacks[i][column] = ''
      return removedItem
    }
  }
  return ''
}

const placeItemOnStack = (item: string, column: number) => {
  let placed = false

  for (let i = stacks.length - 1; i >= 0; i--) {
    if (stacks[i][column] === '') {
      stacks[i][column] = item
      return
    }
  }
  if (!placed) {
    const newRow = stacks[0].map(i => '')
    stacks.unshift(newRow)
    stacks[0][column] = item
  }
}

const makePartOneMoves = () => {
  moves.forEach(moveSet => {
    for (let i = 0; i < moveSet.move; i++) {
      const removedItem = removeItemFromStack(moveSet.from - 1)
      placeItemOnStack(removedItem, moveSet.to - 1)
    }
  })
}

//Part one solution
const findPartOneSolution = () => {
  makePartOneMoves()
  let solution: string[] = []
  let stackNumbers = stacks[0].map((_, i) => i)
  
  stacks.forEach((row, r) => {
    stackNumbers.forEach(col => {
      if (stacks[r][col]) {
        solution[col] = stacks[r][col]
        stackNumbers = stackNumbers.filter(n => n !== col)
      }
    })
  })

  return solution.join('')
}

// Part 1 solution
// console.log(findPartOneSolution())


// Part 2 code
const replaceItemsOnStacks = (from: number, to: number, qty: number) => {
  let cratesToMove: string[] = []

  stacks2.forEach((row, r) => {
    if (stacks2[r][from] && cratesToMove.length < qty) {
      cratesToMove.unshift(stacks2[r][from])
      stacks2[r][from] = ''
    }
  })

  for (let i = stacks2.length -1; i >= 0; i--) {
    if (!stacks2[i][to]) {
      stacks2[i][to] = cratesToMove[0]
      cratesToMove = cratesToMove.slice(1, cratesToMove.length)
    }
  }

  while (cratesToMove.length) {
    const newRow = stacks2[0].map(i => '')
    stacks2.unshift(newRow)
    newRow[to] = cratesToMove[0]
    cratesToMove = cratesToMove.slice(1, cratesToMove.length)
  }
}

const executePartTwoMoves = () => {
  moves.forEach(moveSet => {
    replaceItemsOnStacks(moveSet.from - 1, moveSet.to - 1, moveSet.move)
  })
}

//Part 2 solution
const findPartTwoSolution = () => {
  executePartTwoMoves()
  let solution: string[] = []
  let stackNumbers = stacks2[0].map((_, i) => i)
  
  stacks2.forEach((row, r) => {
    stackNumbers.forEach(col => {
      if (row[col]) {
        solution[col] = row[col]
        stackNumbers = stackNumbers.filter(n => n !== col)
      }
    })
  })

  return solution.join('')
}

console.log(findPartTwoSolution())