import * as fs from 'fs'
// https://upmostly.com/typescript/reading-and-writing-files-with-typescript
// const values = fs.readFileSync('./tst_4.txt', 'utf-8')
const values = fs.readFileSync('./inp_4.txt', 'utf-8')
const fileLines = values.split('\n')
// console.log(fileLines)

interface card {
    id: number
    winning: number[],
    actual: number[],
}

var nums = fileLines.map((line) => (line.split(":")[1].split("|")).map(set => set.trim().split(" ")))

var intersected = nums.map(card => {
    const winning = new Set(card[0].filter(x => x != ""))
    const actual = new Set(card[1].filter(x => x != ""))
    const intersect = Array.from(actual).filter(x => winning.has(x))
    // const intersect = [...actual].filter(x => winning.has(x))
    const len = intersect.length
    return intersect
})

function score(arArNum: string[][]) {
    var scored = arArNum.map(int => {
        switch (int.length) {
            case 0:
                return 0
                break

            default:
                return 2 ** (int.length - 1)
                break
        }
    })
    return scored
}



console.log(intersected[0])
var scored = score(intersected)
console.log("p1: ", scored.reduce((acc, curr) => acc + curr))
console.log("----------")

// NOTE p2 test

// 1 [ '83', '86', '17', '48' ],
// 2 [ '61', '32' ],
// 3 [ '21', '1' ],
// 4 [ '84' ],
// 5 [],
// 6 []

// 1 4 1 X (processed next)
// 2 2 1
// 3 2 1
// 4 1 1
// 5 0 1
// 6 0 1

// 1 4 1
// 2 2 2 X (processed next)
// 3 2 2
// 4 1 2
// 5 0 2
// 6 0 1

// 1 4 1
// 2 2 2
// 3 2 4 X (processed next)
// 4 1 4
// 5 0 2
// 6 0 1

// 1 4 1
// 2 2 2
// 3 2 4
// 4 1 8 X (processed next)
// 5 0 6
// 6 0 1

// 1 4 1
// 2 2 2
// 3 2 4
// 4 1 8
// 5 0 14 X (processed next)
// 6 0 1

// 1 4 1
// 2 2 2
// 3 2 4
// 4 1 8
// 5 0 14
// 6 0 1 X (processed next)




interface Game {
    id: number
    winners: number
    amount: number
}

var structuredP2: Game[] = []
for (var ii = 0; ii < intersected.length; ii++) {
    var v = intersected[ii]
    var gameObj: Game = { id: ii + 1, winners: v.length, amount: 1 }
    structuredP2.push(gameObj)
}

var executedP2: Game[] = structuredP2

// console.log(executedP2)

// for (var g of structuredP2)
for (var gi = 0; gi < structuredP2.length; gi++) {
    var game = structuredP2[gi]
    // console.log(game)
    for (var gw = 1; gw <= game.winners; gw++) {
        // console.log("gi", gi, "gw", gw)
        executedP2[gi + gw]["amount"] += 1 * game.amount
    }
    // console.log("after ", gi + 1)
    // console.log(executedP2)
    // console.log("___")
}

console.log(executedP2.slice(0, 10))
console.log("p2: ", executedP2.reduce((acc, curr) => acc + curr.amount, 0))
