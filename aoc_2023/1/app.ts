import { cl, FileUtils, StringUtils, MathUtils } from '../../utils/index';

const calibList = FileUtils.readLines('./inp_1.txt');

// Word-to-number mappings including overlapping cases
const wordValMap = new Map<string, number>([
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
function getCalibrationValue(line: string, useWordNumbers: boolean = false): number {
    let processedLine = line;
    
    if (useWordNumbers) {
        // Convert word numbers to digits
        processedLine = StringUtils.replaceAll(line, wordValMap);
    }
    
    const first = StringUtils.firstNumericChar(processedLine);
    const last = StringUtils.firstNumericChar(StringUtils.reverse(processedLine));
    
    return parseInt(first + last);
}

// Part 1: Only numeric digits
const resultsP1 = calibList.map(line => getCalibrationValue(line, false));

// Part 2: Include word numbers
const resultsP2 = calibList.map(line => getCalibrationValue(line, true));

cl("p1:", MathUtils.sum(resultsP1));
cl("p2:", MathUtils.sum(resultsP2));

