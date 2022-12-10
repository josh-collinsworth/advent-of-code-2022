import fullInput from './input'

const exampleInput = 
`addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`

// const input: string[] = exampleInput.split('\n')
const input: string[] = fullInput.split('\n')

const partOne = (): number => {
  let currentValue = 1
  let cycleNumber = 1
  let measuredSignals: number[] = []
  
  const checkForSignal = () => {
    if ((cycleNumber + 20) % 40 === 0) {
      measuredSignals.push(cycleNumber * currentValue)
    }
  }
  
  input.forEach((line: string) => {
    checkForSignal()
    cycleNumber++
    if (line.startsWith('addx ')) {
      const numberToAdd = parseInt(line.slice(5))
      checkForSignal()
      cycleNumber++
      currentValue += numberToAdd
    }
  })
  
  return measuredSignals.reduce((a, c) => a + c, 0)
}

console.log(partOne())


const partTwo = (): string => {
  let spritePosition = 1
  let cycleNumber = 1
  let screen: string[][] = []

  //For some reason TypeScript didn't like creating a nested array with shorter methods, so we use this one. ¯\_(ツ)_/¯
  for (let row = 0; row < 6; row++) {
    screen.push([])
    for (let col = 0; col < 40; col++) {
      screen[row].push('.')
    }
  }

  const checkForSignal = () => {
    let spritePositions = [spritePosition - 1, spritePosition, spritePosition + 1]
    const pixel = (cycleNumber -1) % 40
    if (spritePositions.includes(pixel)) {
      const currentRow = Math.floor(cycleNumber / 40)
      const currentColumn = pixel
      screen[currentRow][currentColumn] = '#'
    }
  }

  input.forEach((line: string) => {
    checkForSignal()
    if (line.startsWith('addx ')) {
      const numberToAdd = parseInt(line.slice(5))
      cycleNumber++
      checkForSignal()
      spritePosition += numberToAdd
    }
    cycleNumber++
  })

  let screenToString = ``
  screen.forEach(row => screenToString += row.join('') + '\n')

  return screenToString
}

console.log(partTwo())

