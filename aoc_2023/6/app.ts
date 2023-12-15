import { lookup } from 'dns/promises'
import * as fs from 'fs'
function cl(...args: any[]) {
    console.log(...args)
}
// https://upmostly.com/typescript/reading-and-writing-files-with-typescript
// const values = fs.readFileSync('./tst.txt', 'utf-8')
const values = fs.readFileSync('./inp.txt', 'utf-8')
const parts = values.split(/\n/).map(elem => elem.split(":")[1].trim().split(" ").filter(n => n != "").map(s => parseInt(s)))

const partsP2 = values.split(/\n/).map(elem => elem.split(":")[1].trim().split(" ").filter(n => n != "").reduce((acc, curr) => acc + curr, ""))

// cl(parts)
// cl(partsP2)

// NOTE zipping arrays: https://stackoverflow.com/questions/22015684/zip-arrays-in-javascript
var tS = parts[0].map((t, ti) => [t, parts[1][ti]])
var tSP2 = partsP2.map(t => parseInt(t))

// cl(tS)
// cl(tSP2)

function distancesOfT(tTotal: number) {
    var sOfT: number[][] = []
    for (var i = 0; i < tTotal; i++) {
        var speed = i * 1
        var tRemain = tTotal - i
        var sPossible = speed * tRemain
        sOfT.push([i, sPossible])
    }
    return sOfT
}

function maxDistance(sOfT: number[][]) {
    return sOfT.map(a => a[1]).reduce((acc, curr) => Math.max(curr, acc), 0)
}

function dBiggerX(sOfT: number[][], thres: number): number {
    return sOfT.filter(a => a[1] > thres).length
}

// NOTE testing
// cl(distancesOfT(10))
// cl(maxDistance(distancesOfT(10)))
// cl(dBiggerX(distancesOfT(10), 16))

var mOE: number[] = []
for (var [t, thres] of tS) {
    // cl(t, s)
    mOE.push(dBiggerX(distancesOfT(t), thres))
}

cl("p1:", mOE.reduce((acc, curr) => acc * curr, 1))
cl("-----")

var mOEP2: number[] = []
for (var [t, thres] of [tSP2]) {
    // cl(t, thres)
    mOEP2.push(dBiggerX(distancesOfT(t), thres))
}

cl("p2:", mOEP2.reduce((acc, curr) => acc * curr, 1))