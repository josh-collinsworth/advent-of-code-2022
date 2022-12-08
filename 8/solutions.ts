import unformattedInput from './input'

const testInput = 
`30373
25512
65332
33549
35390`

const input: number[][] = unformattedInput.split('\n').map(row => [...row.split('').map(i => parseInt(i))])

const countVisibleTrees = (grid: number[][]): number => {
  let visibleTrees = 0
  const rowStart = 0
  const rowEnd = grid.length - 1
  const colStart = 0
  const colEnd = grid[0].length - 1

  // Go through each row
  for (let row = 0; row < grid.length; row++) {
    //Go through each column
    for (let col = 0; col < grid[row].length; col++) {
      if ([rowStart, rowEnd].includes(row) || [colStart, colEnd].includes(col)) {
        //End early if we're on the edges
        visibleTrees++
        continue
      } else {
        //Get this tree's value
        let thisTree: number = grid[row][col]
        let leftTrees: number[] = []
        let topTrees: number[] = []
        let rightTrees: number[] = []
        let bottomTrees: number[] = []

        //Loop through the adjacent rows
        grid[row].forEach((tree, i) => {
          if (i < col) {
            leftTrees.push(tree) 
          } else if (i > col) {
            rightTrees.push(tree)
          }
        })

        //Loop through adjacent columns
        for (let innerRow = 0; innerRow < grid.length; innerRow++) {
          if (innerRow < row) {
            topTrees.push(grid[innerRow][col])
          } else if (innerRow > row) {
            bottomTrees.push(grid[innerRow][col])
          }
        }
        if (
          Math.max(...leftTrees) < thisTree ||
          Math.max(...topTrees) < thisTree ||
          Math.max(...rightTrees) < thisTree ||
          Math.max(...bottomTrees) < thisTree
        ) {
          visibleTrees++
        }
      }
    }
  }
  return visibleTrees
}

//Part one solution
console.log(countVisibleTrees(input))



// Part two
const tallyTreeScores = (grid: number[][]): number => {
  let treeScores: number[] = []

  // Go through each row
  for (let row = 1; row < grid.length -1; row++) {
    //Go through each column
    for (let col = 1; col < grid[row].length -1; col++) {
      //Get this tree's value
      let thisTree: number = grid[row][col]
      // LOTS of repeated code here but eh
      // Probably would ideally consolidate these four directions into one loop that would run four times
      // No need to be clever now though
      let leftTrees = 0
      let topTrees = 0
      let rightTrees = 0
      let bottomTrees = 0

      let topBlocked = false
      let leftBlocked = false
      let bottomBlocked = false
      let rightBlocked = false

      //Loop through the adjacent rows...
      for (let y = col - 1; y >= 0; y--) {
        if (!leftBlocked) {
          leftTrees++
        }
        if (grid[row][y] >= thisTree) {
          leftBlocked = true
        }
      }
      for (let y = col + 1; y < grid[row].length; y++) {
        if (!rightBlocked) {
          rightTrees++
        }
        if (grid[row][y] >= thisTree) {
          rightBlocked = true
        }
      }
      //...And columns
      for (let x = row - 1; x >= 0; x--) {
        if (!topBlocked) {
          topTrees++
        } 
        if (grid[x][col] >= thisTree) {
          topBlocked = true
        }
      }
      for (let x = row + 1; x < grid.length; x++) {
        if (!bottomBlocked) {
          bottomTrees++
        } 
        if (grid[x][col] >= thisTree) {
          bottomBlocked = true
        }
      }
      
      //Tally
      const thisScore = topTrees * bottomTrees * leftTrees * rightTrees
      treeScores.push(thisScore)
    }
  }
  return Math.max(...treeScores)
}

console.log(tallyTreeScores(input))