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
function cl(...args) {
    console.log(...args);
}
// https://upmostly.com/typescript/reading-and-writing-files-with-typescript
var values = fs.readFileSync('./tst.txt', 'utf-8');
var values = fs.readFileSync('./inp.txt', 'utf-8');
const parts = values.split(/\n\s*\n/);
const dirChoices = parts[0];
var nodeEdges = {};
parts[1].split(/\n/).map(nd => {
    var prep = nd.split("=");
    var node = prep[0].trim();
    var edges = prep[1].trim().replace("(", "").replace(")", "");
    var left = edges.split(",")[0].trim();
    var right = edges.split(",")[1].trim();
    Object.assign(nodeEdges, { [node]: { "L": left, "R": right } });
});
// cl(dirChoices, nodeEdges)
cl("-".repeat(20));
function findZZZ(current = "AAA") {
    for (const [idx, choice] of Array.from(dirChoices.repeat(100)).entries()) {
        var next = nodeEdges[current][choice];
        // cl("..", current, "->", next)
        current = next;
        if (current === "ZZZ") {
            // cl("ZZZ after", idx + 1, "steps")
            return idx + 1;
        }
    }
}
// p1
cl(findZZZ());
// p2
const startsP2 = Object.keys(nodeEdges).filter(x => x.endsWith("A"));
cl(startsP2);
var starts = [];
var newStarts = startsP2;
// cl("starts", starts, "newStarts", newStarts)
var j = 0;
for (var i = 0; i < 1e12; i++) {
    if (j >= dirChoices.length) {
        j = 0;
    }
    var dir = dirChoices[j];
    j++;
    starts = newStarts;
    newStarts = [];
    for (var start of starts) {
        var next = nodeEdges[start][dir];
        // cl("start", start, "dir", dir, "next", next)
        newStarts.push(next);
    }
    if (newStarts.filter(x => x.endsWith("Z")).length >= 4 /*startsP2.length*/) {
        cl(i + 1);
        cl("newStarts", newStarts, "Xs", newStarts.filter(x => x.endsWith("Z")).length);
        // break
    }
    starts = newStarts;
}
//# sourceMappingURL=app.js.map