import * as fs from 'fs'
// https://upmostly.com/typescript/reading-and-writing-files-with-typescript
// const values = fs.readFileSync('./tst_2.txt', 'utf-8')
const values = fs.readFileSync('./inp_2.txt', 'utf-8')
const fileLines = values.split('\n')
// console.log(fileLines)


var limit: { [index: string]: any } = {
    red: 12,
    green: 13,
    blue: 14
}

const colors = ["red", "green", "blue"]

var validIdsP1: number[] = []


function parseRound(rounds: string) {
    const cnts: { [index: string]: any } = { red: 0, blue: 0, green: 0 }
    rounds.split(",").map(pair => pair.trim().split(" ")).forEach(([num, color]) => {
        switch (color.trim()) {
            case 'red':
                cnts.red = parseInt(num)
                break
            case 'blue':
                cnts.blue = parseInt(num)
                break
            case 'green':
                cnts.green = parseInt(num)
                break
            case undefined || null:
                break
        }
    })
    return cnts
}

function parseGame(game: string) {
    const cnts = parseRound(game)
    return Object.entries(cnts).reduce((fails, curr) => fails || curr[1] > limit[curr[0]], false)
}

/* takes
'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue'
*/
function parseGames(line: string) {
    const gameIdRounds = /Game (\d+): (.*)/
    const [, id, rounds] = gameIdRounds.exec(line)!
    const gamesArr = [...rounds.split(";")]

    var failed = gamesArr.reduce((acc, curr) => acc || parseGame(curr), false)

    if (failed) {
        // console.log(id, !failed)
    }
    else {
        validIdsP1.push(parseInt(id))
    }
}


fileLines.forEach(line => {
    // console.log("---")
    parseGames(line)
})

// console.log(validIdsP1)
console.log("p1: ", validIdsP1.reduce((acc, curr) => acc + curr, 0))

/**
 * xxx
 * xxx
 */

var powersP2: number[] = []


/* takes
'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue'
*/
function parseGamesP2(line: string) {
    const gameIdRounds = /Game (\d+): (.*)/
    const [, id, rounds] = gameIdRounds.exec(line)!
    // console.log(rounds)
    const gamesArr = [...rounds.replace(/\;/g, ",").split(",")]

    // console.log(gamesArr)

    var power = parseGameP2(gamesArr)

    powersP2.push(parseInt(power))

}

function parseGameP2(game: string[]) {
    const cnts = parseRoundP2(game)
    // console.log(game)
    // console.log(cnts)
    return Object.values(cnts).reduce((acc, curr) => acc * curr, 1)
}

function parseRoundP2(rounds: string[]) {
    const cnts: { [index: string]: any } = { red: 0, blue: 0, green: 0 }
    rounds.map(pair => pair.trim().split(" ")).forEach(([num, color]) => {
        switch (color.trim()) {
            case 'red':
                cnts.red = Math.max(parseInt(num), cnts.red)
                break
            case 'blue':
                cnts.blue = Math.max(parseInt(num), cnts.blue)
                break
            case 'green':
                cnts.green = Math.max(parseInt(num), cnts.green)
                break
            case undefined || null:
                break
        }
    })
    return cnts
}

fileLines.forEach(line => {
    // console.log("---")
    parseGamesP2(line)
})

// console.log(validIdsP2)
console.log("p2: ", powersP2.reduce((acc, curr) => acc + curr, 0))