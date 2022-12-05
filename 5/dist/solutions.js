"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var inputFormatter_1 = require("./inputFormatter");
var stacks = __spreadArrays(inputFormatter_1.formattedStacks);
var stacks2 = __spreadArrays(inputFormatter_1.formattedStacks);
var moves = inputFormatter_1.formattedMoves;
var removeItemFromStack = function (column) {
    for (var i = 0; i < stacks.length; i++) {
        if (stacks[i][column]) {
            var removedItem = stacks[i][column];
            stacks[i][column] = '';
            return removedItem;
        }
    }
    return '';
};
var placeItemOnStack = function (item, column) {
    var placed = false;
    for (var i = stacks.length - 1; i >= 0; i--) {
        if (stacks[i][column] === '') {
            stacks[i][column] = item;
            return;
        }
    }
    if (!placed) {
        var newRow = stacks[0].map(function (i) { return ''; });
        stacks.unshift(newRow);
        stacks[0][column] = item;
    }
};
var makePartOneMoves = function () {
    moves.forEach(function (moveSet) {
        for (var i = 0; i < moveSet.move; i++) {
            var removedItem = removeItemFromStack(moveSet.from - 1);
            placeItemOnStack(removedItem, moveSet.to - 1);
        }
    });
};
//Part one solution
var findPartOneSolution = function () {
    makePartOneMoves();
    var solution = [];
    var stackNumbers = stacks[0].map(function (_, i) { return i; });
    stacks.forEach(function (row, r) {
        stackNumbers.forEach(function (col) {
            if (stacks[r][col]) {
                solution[col] = stacks[r][col];
                stackNumbers = stackNumbers.filter(function (n) { return n !== col; });
            }
        });
    });
    return solution.join('');
};
// Part 1 solution
// console.log(findPartOneSolution())
// Part 2 code
var replaceItemsOnStacks = function (from, to, qty) {
    var cratesToMove = [];
    stacks2.forEach(function (row, r) {
        if (stacks2[r][from] && cratesToMove.length < qty) {
            cratesToMove.unshift(stacks2[r][from]);
            stacks2[r][from] = '';
        }
    });
    for (var i = stacks2.length - 1; i >= 0; i--) {
        if (!stacks2[i][to]) {
            stacks2[i][to] = cratesToMove[0];
            cratesToMove = cratesToMove.slice(1, cratesToMove.length);
        }
    }
    while (cratesToMove.length) {
        var newRow = stacks2[0].map(function (i) { return ''; });
        stacks2.unshift(newRow);
        newRow[to] = cratesToMove[0];
        cratesToMove = cratesToMove.slice(1, cratesToMove.length);
    }
};
var executePartTwoMoves = function () {
    moves.forEach(function (moveSet) {
        replaceItemsOnStacks(moveSet.from - 1, moveSet.to - 1, moveSet.move);
    });
};
//Part 2 solution
var findPartTwoSolution = function () {
    executePartTwoMoves();
    var solution = [];
    var stackNumbers = stacks2[0].map(function (_, i) { return i; });
    stacks2.forEach(function (row, r) {
        stackNumbers.forEach(function (col) {
            if (row[col]) {
                solution[col] = row[col];
                stackNumbers = stackNumbers.filter(function (n) { return n !== col; });
            }
        });
    });
    return solution.join('');
};
console.log(findPartTwoSolution());
