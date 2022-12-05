"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.formattedMoves = exports.formattedStacks = void 0;
var input_1 = require("./input");
var utils_1 = require("../utils");
var splitInputToStacksAndMoves = function (input) {
    var stacks = [];
    var moves = [];
    utils_1.splitInputByLine(input).forEach(function (line) {
        if (line.startsWith('move')) {
            moves.push(line);
        }
        else if (line && !line.startsWith(' 1')) {
            stacks.push(line);
        }
    });
    return [stacks, moves];
};
var _a = splitInputToStacksAndMoves(input_1["default"]), stacks = _a[0], moves = _a[1];
var addMissingBracketsToLine = function (str) {
    return str
        .replace(/^\s\s\s/, '[.]')
        .replace(/\s\s\s\s/g, ' [.]');
};
exports.formattedStacks = stacks
    .map(function (line) { return addMissingBracketsToLine(line); })
    .map(function (line) { return __spreadArrays(line.split(' ').map(function (i) { return i.replace(/[\[\]\.]/g, ''); })); });
exports.formattedMoves = moves
    .map(function (move) {
    var matches = move.match(/move ([0-9]+) from ([0-9]+) to ([0-9]+)/);
    return {
        move: parseInt(matches[1]),
        from: parseInt(matches[2]),
        to: parseInt(matches[3])
    };
});
