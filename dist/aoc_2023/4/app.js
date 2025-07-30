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
// const values = fs.readFileSync('./tst_4.txt', 'utf-8')
const values = fs.readFileSync('./inp_4.txt', 'utf-8');
const fileLines = values.split('\n');
var nums = fileLines.map((line) => (line.split(":")[1].split("|")).map(set => set.trim().split(" ")));
var intersected = nums.map(card => {
    const winning = new Set(card[0].filter(x => x != ""));
    const actual = new Set(card[1].filter(x => x != ""));
    const intersect = Array.from(actual).filter(x => winning.has(x));
    // const intersect = [...actual].filter(x => winning.has(x))
    const len = intersect.length;
    return intersect;
});
function score(arArNum) {
    var scored = arArNum.map(int => {
        switch (int.length) {
            case 0:
                return 0;
                break;
            default:
                return 2 ** (int.length - 1);
                break;
        }
    });
    return scored;
}
console.log(intersected[0]);
var scored = score(intersected);
console.log("p1: ", scored.reduce((acc, curr) => acc + curr));
console.log("----------");
var structuredP2 = [];
for (var ii = 0; ii < intersected.length; ii++) {
    var v = intersected[ii];
    var gameObj = { id: ii + 1, winners: v.length, amount: 1 };
    structuredP2.push(gameObj);
}
var executedP2 = structuredP2;
// console.log(executedP2)
// for (var g of structuredP2)
for (var gi = 0; gi < structuredP2.length; gi++) {
    var game = structuredP2[gi];
    // console.log(game)
    for (var gw = 1; gw <= game.winners; gw++) {
        // console.log("gi", gi, "gw", gw)
        executedP2[gi + gw]["amount"] += 1 * game.amount;
    }
    // console.log("after ", gi + 1)
    // console.log(executedP2)
    // console.log("___")
}
console.log(executedP2.slice(0, 10));
console.log("p2: ", executedP2.reduce((acc, curr) => acc + curr.amount, 0));
//# sourceMappingURL=app.js.map