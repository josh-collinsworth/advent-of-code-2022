import { input } from "./input";

const splitInput = input.split(/\n/);
let elfTotals = [];
let currentElfCalories = 0;

splitInput.forEach((item) => {
  if (item) {
    currentElfCalories += parseInt(item);
  } else {
    elfTotals.push(currentElfCalories);
    currentElfCalories = 0;
  }
});

// Part one solution
console.log(Math.max(...elfTotals));

// Part two solution
console.log(
  elfTotals
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, c) => a + c, 0)
);
