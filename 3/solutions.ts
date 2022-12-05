import input from './input'
import { splitInputByLine } from '../utils'

const alphabet = `abcdefghijklmnopqrstuvwxyz`
const lowercaseAlpha: string[] = alphabet.split('')
const uppercaseAlpha = alphabet.toUpperCase().split('')
const fullAlpha = [...lowercaseAlpha, ...uppercaseAlpha]

const splitStringInHalf = (string: string): string[] => {
  const halfwayPoint = string.length / 2
  return [string.substring(0, halfwayPoint), string.substring(halfwayPoint, string.length)]
}

const inputLines = splitInputByLine(input)
const splitInputs = inputLines.map(line => splitStringInHalf(line))

const findMatchingItemInLine = (line: string[]): string => {
  return [...new Set(line[0])].filter(i => [...new Set(line[1])].includes(i)).toString()
}

const getItemPriority = (item: string): number => {
  return fullAlpha.indexOf(item) + 1
}

const getTotalPriority = (input: string[][]): number => {
  let total = 0
  input.forEach(input => total += getItemPriority(findMatchingItemInLine(input)))
  return total
}

// Part one solution
console.log(getTotalPriority(splitInputs))


// Part two code
const findMatchingItemInGroup = (group: string[]): string => {
  return [...new Set(group[0])].filter(i => 
    [...new Set(group[1])].includes(i) &&
    [...new Set(group[2])].includes(i)
  ).toString()
}

const getTotalPriority2 = (input: string[]): number => {
  let total = 0;
  for (let i = 0; i < input.length; i += 3) {
    const matchingItem = findMatchingItemInGroup([input[i], input[i + 1], input[i + 2]])
    const matchingItemValue = getItemPriority(matchingItem)
    total += matchingItemValue
  }
  return total
}

console.log(getTotalPriority2(inputLines))