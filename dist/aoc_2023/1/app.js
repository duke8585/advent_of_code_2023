"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../utils/index");
const calibList = index_1.FileUtils.readLines('./inp_1.txt');
// Word-to-number mappings including overlapping cases
const wordValMap = new Map([
    ['oneight', 18],
    ['twone', 21],
    ['threeight', 38],
    ['fiveight', 58],
    ['sevenine', 79],
    ['eightwo', 82],
    ['eighthree', 83],
    ['nineight', 98],
    ['one', 1],
    ['two', 2],
    ['three', 3],
    ['four', 4],
    ['five', 5],
    ['six', 6],
    ['seven', 7],
    ['eight', 8],
    ['nine', 9]
]);
/**
 * Extract calibration value from a line (first and last digit)
 */
function getCalibrationValue(line, useWordNumbers = false) {
    let processedLine = line;
    if (useWordNumbers) {
        // Convert word numbers to digits
        processedLine = index_1.StringUtils.replaceAll(line, wordValMap);
    }
    const first = index_1.StringUtils.firstNumericChar(processedLine);
    const last = index_1.StringUtils.firstNumericChar(index_1.StringUtils.reverse(processedLine));
    return parseInt(first + last);
}
// Part 1: Only numeric digits
const resultsP1 = calibList.map(line => getCalibrationValue(line, false));
// Part 2: Include word numbers
const resultsP2 = calibList.map(line => getCalibrationValue(line, true));
(0, index_1.cl)("p1:", index_1.MathUtils.sum(resultsP1));
(0, index_1.cl)("p2:", index_1.MathUtils.sum(resultsP2));
//# sourceMappingURL=app.js.map