import { lookup } from 'dns/promises'
import * as fs from 'fs'
function cl(...args: any[]) {
    console.log(...args)
}


// https://upmostly.com/typescript/reading-and-writing-files-with-typescript
var values = fs.readFileSync('./tst.txt', 'utf-8')
var values = fs.readFileSync('./inp.txt', 'utf-8')
const parts = values.split(/\n/).map(elem => elem.trim().split(" ")).map(elem => {
    return { seq: elem[0], bid: parseInt(elem[1]) }
})

// cl(parts)



function groupByKey(seq: any[]): Object {
    var emptyAcc: { [index: string]: number } = {} // NOTE important always :)
    var counts = seq.reduce((acc, x) => {
        // cl(acc, x)
        if (Object.keys(acc).includes(x)) {
            acc[x] += 1
        }
        else {
            acc[x] = 1
        }
        return acc

    }, emptyAcc)
    return counts
}

function gradeSeq(seq: string): number {
    const arrSeq = Array.from(seq)
    const distinct = [...new Set(arrSeq)]
    const counts = groupByKey(arrSeq)
    // cl(arrSeq, counts)
    if (distinct.length == 1) {
        /** AAAAA */
        return 7
    }
    if (distinct.length == 2) {
        /** QQJJJ QJJJJ */
        if (Object.values(counts).includes(3) && Object.values(counts).includes(2)) { return 5 }
        else { return 6 }
    }
    if (distinct.length == 3) {
        /** QQJJT QQQJT */
        if (Object.values(counts).filter(x => x == 2).length == 2) {
            return 3
        }
        else { return 4 }
    }
    if (distinct.length == 4) {
        /** KQJTT KKQJT */
        return 2
    }
    else {
        /** 23456 AKQJT */
        return 1
    }

}

// INFO inspired by https://github.com/tlareg/advent-of-code/blob/master/src/2023/day07/index.ts
const CARDS: { [index: string]: any } = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2,
} as const

interface HandGraded {
    seq: string,
    grading: number,
    bid: number
}

var gradedHands: HandGraded[] = []

for (const [i, hand] of Object.entries(parts)) {
    var grade = gradeSeq(hand.seq)
    gradedHands.push({
        seq: hand.seq,
        grading: grade,
        bid: hand.bid
    })
}


function compareHands(handA: HandGraded, handB: HandGraded): number {
    if (handA.grading === handB.grading) {
        for (var i = 0; i < handA.seq.length; i++) {
            if (handA.seq[i] === handB.seq[i]) {
                continue
            }
            else {
                return CARDS[handA.seq[i]] - CARDS[handB.seq[i]]
            }
        }
    }
    return handA.grading - handB.grading
}

cl(compareHands({ seq: "QQQJA", grading: 4, bid: 555, }, { seq: "T55J5", grading: 4, bid: 666, }))

var gradedHandsSorted = gradedHands.sort((n1, n2) => compareHands(n1, n2))
// cl(gradedHands)
cl(gradedHandsSorted)

cl(gradedHandsSorted.reduce((acc, curr, i) => {
    return acc + curr.bid * (i + 1)
}, 0))



