import { lookup } from 'dns/promises'
import * as fs from 'fs'
import { cursorTo } from 'readline'
function cl(...args: any[]) {
    console.log(...args)
}


// https://upmostly.com/typescript/reading-and-writing-files-with-typescript
var values = fs.readFileSync('./tst.txt', 'utf-8')
var values = fs.readFileSync('./inp.txt', 'utf-8')
const parts = values.split(/\n\s*\n/)
const dirChoices = parts[0]
var nodeEdges: { [index: string]: { [index: string]: string } } = {}
parts[1].split(/\n/).map(
    nd => {
        var prep = nd.split("=")
        var node = prep[0].trim()
        var edges = prep[1].trim().replace("(", "").replace(")", "")
        var left = edges.split(",")[0].trim()
        var right = edges.split(",")[1].trim()
        Object.assign(nodeEdges, { [node]: { "L": left, "R": right } })
    }

)
// cl(dirChoices, nodeEdges)

cl("-".repeat(20))

function findZZZ(current: string = "AAA") {
    for (const [idx, choice] of Array.from(dirChoices.repeat(100)).entries()) {
        var next = nodeEdges[current][choice]
        // cl("..", current, "->", next)
        current = next
        if (current === "ZZZ") {
            // cl("ZZZ after", idx + 1, "steps")
            return idx + 1
        }
    }
}

// p1

cl(findZZZ())

// p2

const startsP2 = Object.keys(nodeEdges).filter(x => x.endsWith("A"))
cl(startsP2)


var starts: string[] = []
var newStarts: string[] = startsP2
// cl("starts", starts, "newStarts", newStarts)
var j = 0
for (var i = 0; i < 1e12; i++) {
    if (j >= dirChoices.length) {
        j = 0
    }
    var dir = dirChoices[j]
    j++
    starts = newStarts
    newStarts = []
    for (var start of starts) {
        var next = nodeEdges[start][dir]
        // cl("start", start, "dir", dir, "next", next)
        newStarts.push(next)
    }
    if (newStarts.filter(x => x.endsWith("Z")).length >= 4/*startsP2.length*/) {
        cl(i + 1)
        cl("newStarts", newStarts, "Xs", newStarts.filter(x => x.endsWith("Z")).length)
        // break
    }
    starts = newStarts
}

