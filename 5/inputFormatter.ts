import input from './input'
import { splitInputByLine } from '../utils'


const splitInputToStacksAndMoves = (input: string): string[][] => {
  let stacks: string[] = []
  let moves: string[] = []
  
  splitInputByLine(input).forEach(line => {
    if (line.startsWith('move')) {
      moves.push(line)
    } else if (line && !line.startsWith(' 1')) {
      stacks.push(line)
    }
  })
  
  return [stacks, moves]
}

const [stacks, moves] = splitInputToStacksAndMoves(input)

const addMissingBracketsToLine = (str: string): string => {
  return str
    .replace(/^\s\s\s/, '[.]')
    .replace(/\s\s\s\s/g, ' [.]')
}

export const formattedStacks = stacks
  .map(line => addMissingBracketsToLine(line))
  .map(line => [...line.split(' ').map(i => i.replace(/[\[\]\.]/g, ''))])


export const formattedMoves = moves
  .map(move => {
    const matches = move.match(/move ([0-9]+) from ([0-9]+) to ([0-9]+)/)
    return {
      move: parseInt(matches![1]),
      from: parseInt(matches![2]),
      to: parseInt(matches![3]),
    }
  })
