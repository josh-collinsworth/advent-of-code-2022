import fullInput from './input'

const testInput = 
`Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`

  
interface Monkey {
  items: number[]
  operation(level: number): number
  test(item: number): boolean
  target(test: boolean): number
  divisor: number
  inspected: number 
}

const buildMonkeyListFromInput = (input: string): Monkey[] => {
  const splitInput = input.split('\n')
  const monkeys: Monkey[] = []
  let currentMonkey = 0
  splitInput.forEach((line, lineIndex) => {
    if (line.startsWith('Monkey ')) {
      currentMonkey = parseInt(line.slice(7))
      if (!monkeys[currentMonkey]) {
        monkeys[currentMonkey] = { items: [], operation: () => 0, test: () => false, target: () => 0, inspected: 0, divisor: 0 }
      }
    } else if (line.startsWith('Starting items: ')) {
      const items = line.slice(16).split(',').map(n => parseInt(n))
      monkeys[currentMonkey].items = items
    } else if (line.startsWith('Operation: new = ')) {
      const operator = line.slice(21, 22)
      const numerator = line.slice(23)
      monkeys[currentMonkey].operation = (level: number) => {
        const amount = parseInt(numerator) || level
        switch(operator) {            
          case '+':
            return level + amount
          case '-':
            return level - amount
          case '/':
            return level / amount      
          case '*':
            return level * amount
          default: 
            return level // Not used but makes TypeScript happy
        }
      }
    } else if (line.startsWith('Test: divisible by ')) {
      const divisor = parseInt(line.slice(19))
      monkeys[currentMonkey].divisor = divisor
      monkeys[currentMonkey].test = (item: number): boolean => item % divisor === 0
    } else if (line.startsWith('  If true: throw to monkey ')) {
      const thisLine = parseInt(line.slice(27))
      const nextLine = parseInt(splitInput[lineIndex + 1].slice(28))
      monkeys[currentMonkey].target = (test: boolean) => test ? thisLine : nextLine
    }
  })

  return monkeys
}

// const monkeys = buildMonkeyListFromInput(testInput)
const monkeys = buildMonkeyListFromInput(fullInput)

const inspect = (monkey: Monkey): void => {
  monkey.inspected++
  const inspectedItem = monkey.items[0]
  const inspectedValue = monkey.operation(inspectedItem)
  const postValue = Math.floor(inspectedValue / 3)
  const monkeyThrownTo = monkey.target(monkey.test(postValue))
  monkey.items = monkey.items.slice(1)
  monkeys[monkeyThrownTo].items.push(postValue)
}

// let i = 1
// while (i <= 20) {
//   monkeys.forEach(monkey => {
//     while(monkey.items.length) {
//       inspect(monkey)
//     }
//   })
//   i++
// }

// const monkeyBusiness = monkeys.map(monkey => monkey.inspected).sort((a, b) => b - a)


// Part one solution
// console.log(monkeyBusiness[0] * monkeyBusiness[1])


// Part two
// h/t to Andrew Walpole; wouldn't have gotten this part without some help
const findLCM = (numbers: number[]): number => {
  let lcm: number|undefined
  let i = Math.min(...numbers)
  while (!lcm) {
    let fits = true
    numbers.forEach(number => {
      if (i % number !== 0) {
        fits = false
      }
    })
    if (fits) lcm = i
    i++
  }
  return lcm
}

const divisors: number[] = []
monkeys.forEach(monkey => divisors.push(monkey.divisor))

const lcm = findLCM(divisors)

const reduceValue = (value: number): number => {
  if (value > lcm) {
    return value % lcm
  }
  return value
}

const inspect2 = (monkey: Monkey): void => {
  monkey.inspected++
  const inspectedItem = monkey.items[0]
  const inspectedValue = reduceValue(inspectedItem)
  const postValue = monkey.operation(inspectedValue)
  const monkeyThrownTo = monkey.target(monkey.test(postValue))
  monkey.items = monkey.items.slice(1)
  monkeys[monkeyThrownTo].items.push(postValue)
}

let n = 1
while (n <= 10000) {
  // console.log(n)
  monkeys.forEach(monkey => {
    while(monkey.items.length) {
      inspect2(monkey)
    }
  })
  n++
}

const monkeyBusiness = monkeys.map(monkey => monkey.inspected).sort((a, b) => b - a)
console.log(monkeyBusiness[0] * monkeyBusiness[1])
