import * as fs from 'fs';
// https://upmostly.com/typescript/reading-and-writing-files-with-typescript
const values = fs.readFileSync('./inp_1.txt', 'utf-8');
const calibList = values.split('\n');
// console.log(wordList);

function reverseString(s: string): string {
    return s.split("").reverse().join("");
}


function firstNumericHit(s: string): string {
    var chars = [...s]
    var len = chars.length
    var firstIntStr = (0).toString()// NOTE fallback
    // console.log(len, chars)
    for (let i = 0; i < len; i++) {
        var sChar = parseInt(chars[i])
        if (!Number.isNaN(sChar)) {
            var firstIntStr = new Number(sChar).toString()
        }
    }

    return firstIntStr
}


function allReplace(str: string, transl: Map<string, number>) {
    for (const entry of transl.entries()) {
        var str = str.replace(new RegExp(entry[0], 'g'), entry[1].toString());
    }
    return str;
};

let WordValMap = new Map<string, number>()
WordValMap.set("oneight", 18)
WordValMap.set("twone", 21)
WordValMap.set("threeight", 38)
WordValMap.set("fiveight", 58)
WordValMap.set("sevenine", 79)
WordValMap.set("eightwo", 82)
WordValMap.set("eighthree", 83)
WordValMap.set("nineight", 98)
WordValMap.set("one", 1)
WordValMap.set("two", 2)
WordValMap.set("three", 3)
WordValMap.set("four", 4)
WordValMap.set("five", 5)
WordValMap.set("six", 6)
WordValMap.set("seven", 7)
WordValMap.set("eight", 8)
WordValMap.set("nine", 9)



var results_p1: number[] = []
var results_p2: number[] = []

calibList.forEach(val => {


    var first: string = firstNumericHit(val)
    var last: string = firstNumericHit(reverseString(val))
    // console.log(val, first, last)
    var concat: string = first + last
    var concatInt: number = parseInt(concat)

    results_p1.push(concatInt)

    var valRepl = allReplace(val, WordValMap)
    var last: string = firstNumericHit(valRepl)
    var first: string = firstNumericHit(reverseString(valRepl))
    var concat: string = first + last
    var concatInt: number = parseInt(concat)
    // console.log(valRepl, concatInt)

    results_p2.push(concatInt)


    // console.log(concat)
});

console.log("p1: ", results_p1.reduce((sum, current) => sum + current, 0))
console.log("p2: ", results_p2.reduce((sum, current) => sum + current, 0))

