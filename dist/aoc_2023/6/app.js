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
// const values = fs.readFileSync('./tst.txt', 'utf-8')
const values = fs.readFileSync('./inp.txt', 'utf-8');
const parts = values.split(/\n/).map(elem => elem.split(":")[1].trim().split(" ").filter(n => n != "").map(s => parseInt(s)));
const partsP2 = values.split(/\n/).map(elem => elem.split(":")[1].trim().split(" ").filter(n => n != "").reduce((acc, curr) => acc + curr, ""));
// cl(parts)
// cl(partsP2)
// NOTE zipping arrays: https://stackoverflow.com/questions/22015684/zip-arrays-in-javascript
var tS = parts[0].map((t, ti) => [t, parts[1][ti]]);
var tSP2 = partsP2.map(t => parseInt(t));
// cl(tS)
// cl(tSP2)
function distancesOfT(tTotal) {
    var sOfT = [];
    for (var i = 0; i < tTotal; i++) {
        var speed = i * 1;
        var tRemain = tTotal - i;
        var sPossible = speed * tRemain;
        sOfT.push([i, sPossible]);
    }
    return sOfT;
}
function maxDistance(sOfT) {
    return sOfT.map(a => a[1]).reduce((acc, curr) => Math.max(curr, acc), 0);
}
function dBiggerX(sOfT, thres) {
    return sOfT.filter(a => a[1] > thres).length;
}
// NOTE testing
// cl(distancesOfT(10))
// cl(maxDistance(distancesOfT(10)))
// cl(dBiggerX(distancesOfT(10), 16))
var mOE = [];
for (var [t, thres] of tS) {
    // cl(t, s)
    mOE.push(dBiggerX(distancesOfT(t), thres));
}
cl("p1:", mOE.reduce((acc, curr) => acc * curr, 1));
cl("-----");
var mOEP2 = [];
for (var [t, thres] of [tSP2]) {
    // cl(t, thres)
    mOEP2.push(dBiggerX(distancesOfT(t), thres));
}
cl("p2:", mOEP2.reduce((acc, curr) => acc * curr, 1));
//# sourceMappingURL=app.js.map