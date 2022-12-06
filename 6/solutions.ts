import input from './input'

// Code golfed this one a little
const findSignalInString = (str: string, signalSize: number): number => {
  for (let i = signalSize - 1; i < str.length; i++) {
    const thisGroup = str.slice(i - signalSize, i)
    if (new Set(thisGroup).size === signalSize) return i
  }
  return 0 // Just a needed fallback case; never triggered in this puzzle
}

console.log(findSignalInString(input, 4)) // Part one
console.log(findSignalInString(input, 14)) // Part two
