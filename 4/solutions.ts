import { exampleInput, fullInput } from './input'
import { splitInputByLine, splitStringByComma } from '../utils'

const formattedExampleInput: string[][] = splitInputByLine(exampleInput).map(line => splitStringByComma(line))
const formattedFullInput: string[][] = splitInputByLine(fullInput).map(line => splitStringByComma(line))

const convertLineToIntegers = (line: string): number[] => {
  return line.split('-').map(n => parseInt(n))
}

const isOneRangeContainedByTheOther = (line: string[]): boolean => {
  const [a, b] = line
  const [lowerA, upperA] = convertLineToIntegers(a)
  const [lowerB, upperB] = convertLineToIntegers(b)

  return (
    (lowerA <= lowerB && upperA >= upperB) ||
    (lowerB <= lowerA && upperB >= upperA)
  )
}

const countOverlappingPairs = (input: string[][]): number => {
  let overlappingPairs = 0

  input.forEach(line => {
    if (isOneRangeContainedByTheOther(line)) overlappingPairs += 1
  })

  return overlappingPairs
}

// Part one solution
console.log(countOverlappingPairs(formattedFullInput))


// Part two code
const doRangesOverlap = (lowerA: number, upperA: number, lowerB: number, upperB: number): boolean => {
  const a = generateRanges(lowerA, upperA)
  const b = generateRanges(lowerB, upperB)

  return a.filter(val => b.includes(val)).length > 0
}

const generateRanges = (a: number, b: number): number[] => {
  let range = []
  for (let i = a; i <= b; i++) {
    range.push(i)
  }
  return range
}

const doLinesOverlap = (line: string[]): boolean => {
  const [a, b] = line
  const [lowerA, upperA] = convertLineToIntegers(a)
  const [lowerB, upperB] = convertLineToIntegers(b)

  return doRangesOverlap(lowerA, upperA, lowerB, upperB)
}

const countOverlappingPairs2 = (input: string[][]): number => {
  let overlappingPairs = 0

  input.forEach(line => {
    if (doLinesOverlap(line)) {
      overlappingPairs += 1
    }
  })

  return overlappingPairs
}

// Part 2 solution
console.log(countOverlappingPairs2(formattedFullInput))