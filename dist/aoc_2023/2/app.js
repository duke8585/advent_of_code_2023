"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
// https://upmostly.com/typescript/reading-and-writing-files-with-typescript
// const values = fs.readFileSync('./tst_2.txt', 'utf-8')
const values = fs.readFileSync('./inp_2.txt', 'utf-8');
const fileLines = values.split('\n');
// console.log(fileLines)
var limit = {
    red: 12,
    green: 13,
    blue: 14
};
const colors = ["red", "green", "blue"];
var validIdsP1 = [];
function parseRound(rounds) {
    const cnts = { red: 0, blue: 0, green: 0 };
    rounds.split(",").map(pair => pair.trim().split(" ")).forEach(([num, color]) => {
        switch (color.trim()) {
            case 'red':
                cnts.red = parseInt(num);
                break;
            case 'blue':
                cnts.blue = parseInt(num);
                break;
            case 'green':
                cnts.green = parseInt(num);
                break;
            default:
                break;
        }
    });
    return cnts;
}
function parseGame(game) {
    const cnts = parseRound(game);
    return Object.entries(cnts).reduce((fails, curr) => fails || curr[1] > limit[curr[0]], false);
}
/* takes
'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue'
*/
function parseGames(line) {
    const gameIdRounds = /Game (\d+): (.*)/;
    const [, id, rounds] = gameIdRounds.exec(line);
    const gamesArr = [...rounds.split(";")];
    var failed = gamesArr.reduce((acc, curr) => acc || parseGame(curr), false);
    if (failed) {
        // console.log(id, !failed)
    }
    else {
        validIdsP1.push(parseInt(id));
    }
}
fileLines.forEach(line => {
    // console.log("---")
    parseGames(line);
});
// console.log(validIdsP1)
console.log("p1: ", validIdsP1.reduce((acc, curr) => acc + curr, 0));
/**
 * xxx
 * xxx
 */
var powersP2 = [];
/* takes
'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue'
*/
function parseGamesP2(line) {
    const gameIdRounds = /Game (\d+): (.*)/;
    const [, id, rounds] = gameIdRounds.exec(line);
    // console.log(rounds)
    const gamesArr = [...rounds.replace(/\;/g, ",").split(",")];
    // console.log(gamesArr)
    var power = parseGameP2(gamesArr);
    powersP2.push(parseInt(power));
}
function parseGameP2(game) {
    const cnts = parseRoundP2(game);
    // console.log(game)
    // console.log(cnts)
    return Object.values(cnts).reduce((acc, curr) => acc * curr, 1);
}
function parseRoundP2(rounds) {
    const cnts = { red: 0, blue: 0, green: 0 };
    rounds.map(pair => pair.trim().split(" ")).forEach(([num, color]) => {
        switch (color.trim()) {
            case 'red':
                cnts.red = Math.max(parseInt(num), cnts.red);
                break;
            case 'blue':
                cnts.blue = Math.max(parseInt(num), cnts.blue);
                break;
            case 'green':
                cnts.green = Math.max(parseInt(num), cnts.green);
                break;
            default:
                break;
        }
    });
    return cnts;
}
fileLines.forEach(line => {
    // console.log("---")
    parseGamesP2(line);
});
// console.log(validIdsP2)
console.log("p2: ", powersP2.reduce((acc, curr) => acc + curr, 0));
//# sourceMappingURL=app.js.map