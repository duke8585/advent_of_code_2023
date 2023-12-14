import { lookup } from 'dns/promises'
import * as fs from 'fs'
// https://upmostly.com/typescript/reading-and-writing-files-with-typescript
// const values = fs.readFileSync('./tst.txt', 'utf-8')
const values = fs.readFileSync('./inp.txt', 'utf-8')
const parts = values.split(/\n\s*\n/)
// console.log(parts)

var [seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
] = parts.slice(1, parts.length).map(lookup => lookup.split(/:/)[1].trim().split(/\n/).map(row =>
    row.split(" ").map(entry => parseInt(entry))))

var seedList = parts[0].split(/:/)[1].trim().split(" ").map(seed => parseInt(seed))

if (false) {
    console.log(seedList)
    console.log("\n", seedToSoil, "\n",
        soilToFertilizer, "\n",
        fertilizerToWater, "\n",
        waterToLight, "\n",
        lightToTemperature, "\n",
        temperatureToHumidity, "\n",
        humidityToLocation, "\n")
}


function lookUpX(search: number, lookup: number[][]) {
    // console.log("+++ new lookUpX run")
    for (const row of lookup) {
        var dest = row[0]
        var src = row[1]
        var len = row[2]
        var lower = src
        var upper = src + len
        if (lower <= search && search < upper) {
            return dest + (search - lower)
            // console.log(search, " in: ", lower, "-", upper)
            //     for (var i = 0; i < len; i++) {
            //         // console.log("S|SRC|DEST", search, src + i, dest + i)
            //         if (search === src + i) {
            //             // console.log("matched", search, "to", dest + i)
            //             return dest + i
            //         }

            //     }
        }
    }
    // console.log("not matched", search, "default", search)
    return search
}

// NOTE testing
// console.log(lookUpX(14, seedToSoil))
// console.log(lookUpX(799, seedToSoil))


var lookups = [seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
]

function walkLookups(search: number, lookupsArr: number[][][] = lookups) {
    return lookupsArr.reduce((acc, curr) => lookUpX(acc, curr), search)
}

// NOTE testing
// console.log(14, walkLookups(14))

// NOTE p1
var seedLocations: number[][] = []
for (var seed of seedList) {
    seedLocations.push([seed, walkLookups(seed)])
    // console.log(seed, walkLookups(seed))
}

console.log("p1:", seedLocations.reduce((acc, curr) => Math.min(curr[1], acc), 9999999999999999))


// NOTE p2 start

function sliding(arr: any[], size: number, offset: number) {
    var arrArr: any[][] = []
    for (var i = 0; i < arr.length; i += offset) {
        var subArr = arr.slice(i, i + size)
        arrArr.push(subArr)
    }
    return arrArr

}
// NOTE sliding test
// var a = Array.from(Array(10).keys())
// console.log(sliding(a, 2, 2))
// console.log("---")
// console.log(sliding(a, 3, 3))

var seedListsP2: number[][] = []
const range = (start: number, end: number) => Array.from({ length: (end - start) }, (v, k) => k + start)

for (const [begin, rng] of sliding(seedList, 2, 2)) {
    console.log(begin, rng)
    // for (var i = begin; i < begin + rng; i++) {
    seedListsP2.push(range(begin, begin + rng))
    // }
    console.log(seedListsP2)
}


// sliding(seedList, 2, 2).forEach(())

// var seedLocationsP2: number[][] = []
// for (var seed of seedListP2) {
//     var loc = walkLookups(seed)
//     seedLocationsP2.push([seed, loc])
//     // console.log(seed, loc)
// }

// console.log("p2:", seedLocationsP2.reduce((acc, curr) => Math.min(curr[1], acc), 9999999999999999))

// TODO cannot do because of performance likely

/* 
/Users/max.rieger/sandbox/advent_of_code_2023/aoc_2023/5/app.ts:106
        seedListP2.push(i)
*/