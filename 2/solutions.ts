import { input } from "./input";

interface MoveSet {
  [key: string]: PossibleMove;
}

type PossibleMove = "Rock" | "Paper" | "Scissors";

const ROCK: PossibleMove = "Rock";
const PAPER: PossibleMove = "Paper";
const SCISSORS: PossibleMove = "Scissors";

const opponentMoves: MoveSet = {
  A: ROCK,
  B: PAPER,
  C: SCISSORS,
};

const yourMoves: MoveSet = {
  X: ROCK,
  Y: PAPER,
  Z: SCISSORS,
};

interface GameScores {
  win: number;
  loss: number;
  draw: number;
}

interface GameInputs {
  opponentMove: PossibleMove;
  yourMove: PossibleMove;
}

const outcomes: GameScores = {
  loss: 0,
  draw: 3,
  win: 6,
};

interface Shot {
  beats: PossibleMove;
  beat_by: PossibleMove;
  scores: number;
}

const shotProps = {
  Rock: {
    beats: SCISSORS,
    beat_by: PAPER,
    scores: 1,
  },
  Paper: {
    beats: ROCK,
    beat_by: SCISSORS,
    scores: 2,
  },
  Scissors: {
    beats: PAPER,
    beat_by: ROCK,
    scores: 3,
  },
};

const calculateGameScore = (gameInputs: GameInputs): number => {
  const { opponentMove, yourMove } = gameInputs;
  const moveScore = shotProps[yourMove].scores;

  if (shotProps[yourMove].beats == opponentMove) {
    return outcomes.win + moveScore;
  } else if (shotProps[opponentMove].beats == yourMove) {
    return outcomes.loss + moveScore;
  } else {
    return outcomes.draw + moveScore;
  }
};

const calculateTotalScore = (sets: string[]): number => {
  let totalScore = 0;
  sets.forEach((set) => {
    const [theirMove, yourMove] = set.split(" ");
    totalScore += calculateGameScore({
      opponentMove: opponentMoves[theirMove],
      yourMove: yourMoves[yourMove],
    });
  });
  return totalScore;
};

// Part one answer
console.log(calculateTotalScore(input.split(/\n/)));

// Part two code
const possibleOutcomes = {
  X: "loss",
  Y: "draw",
  Z: "win",
};

interface GameInputs2 {
  opponentMove: PossibleMove;
  desiredOutcome: "loss" | "draw" | "win";
}

const calculateDesiredMove = (gameInputs: GameInputs2): PossibleMove => {
  const { opponentMove, desiredOutcome } = gameInputs;

  switch (desiredOutcome) {
    case "loss":
      return shotProps[opponentMove].beats;
    case "draw":
      return opponentMove;
    default:
      return shotProps[opponentMove].beat_by;
  }
};

const calculateTotalScore2 = (sets: string[]): number => {
  let totalScore = 0;
  sets.forEach((set) => {
    const [theirMove, yourGoal] = set.split(" ");
    const opponentMove = opponentMoves[theirMove];
    totalScore += calculateGameScore({
      opponentMove,
      yourMove: calculateDesiredMove({
        opponentMove,
        desiredOutcome: possibleOutcomes[yourGoal],
      }),
    });
  });
  return totalScore;
};

calculateTotalScore2(input.split(/\n/));
