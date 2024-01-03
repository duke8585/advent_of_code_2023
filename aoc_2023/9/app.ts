import * as fs from 'fs'
function cl(...args: any[]) {
    console.log(...args)
}


// https://upmostly.com/typescript/reading-and-writing-files-with-typescript
var values = fs.readFileSync('./tst.txt', 'utf-8')
var values = fs.readFileSync('./inp.txt', 'utf-8')
const rows = values.split(/\n/).map(r => r.split(" ").map(e => parseInt(e)))

// cl(rows)

function sliding(arr: any[], size: number, offset: number) {
    var arrArr: any[][] = []
    for (var i = 0; i < arr.length; i += offset) {
        var subArr = arr.slice(i, i + size)
        arrArr.push(subArr)
    }
    return arrArr

}

// var x = [1, 3, 2, 4, 3, 5, 4, 7, 5, 8]
// cl(sliding(x, 2, 2).map(x => x[1] - x[0]))

function analyze(seq: number[][]): number[][] {
    // cl(seq)
    var diffs: number[] = sliding(seq[seq.length - 1], 2, 1) // NOTE take last deconstruction always
        .map(x => x[1] - x[0])
        .filter(x => !isNaN(x))
    seq.push(diffs)
    if ([...new Set(diffs)].length === 1) {
        // cl("--" + " done ".repeat(4) + "--")
        return seq
    }
    else {
        return analyze(seq)
    }
}

var allNextP1 = rows.map(row => {
    // cl(row)
    var res: number[][] = analyze([row])
    // cl(res)
    var next = res.reduce((acc, curr) =>
        acc + curr[curr.length - 1]
        , 0)
    // cl("+".repeat(20))
    return next
})

var allPrevP2 = rows.map(row => {
    // cl(row)
    var res: number[][] = analyze([row]).reverse()
    // cl(res)
    var next = res.reduce((acc, curr) => {
        var nxt = curr[0] - acc
        // cl("     ", acc, curr, nxt)
        return nxt
    }
        , 0)
    // cl("+".repeat(20))
    return next // res[0][0] - next
})

cl("-".repeat(20))
cl("p1")
cl(allNextP1)
cl(allNextP1.reduce((acc, curr) => acc + curr, 0))

cl("-".repeat(20))
cl("p2")
cl(allPrevP2)
cl(allPrevP2.reduce((acc, curr) => acc + curr, 0))
