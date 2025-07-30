"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../utils/index");
const rows = index_1.FileUtils.readLines('./inp.txt')
    .map(row => row.split(" ").map(num => parseInt(num)));
/**
 * Recursively analyze sequence differences until all differences are the same
 */
function analyzeSequence(seq) {
    const lastSequence = seq[seq.length - 1];
    const diffs = index_1.ArrayUtils.sliding(lastSequence, 2, 1)
        .map(pair => pair[1] - pair[0])
        .filter(diff => !isNaN(diff));
    seq.push(diffs);
    // Check if all differences are the same (base case)
    if (index_1.ArrayUtils.unique(diffs).length === 1) {
        return seq;
    }
    else {
        return analyzeSequence(seq);
    }
}
/**
 * Calculate next value in sequence (Part 1)
 */
function calculateNext(row) {
    const analyzed = analyzeSequence([row]);
    return index_1.MathUtils.sum(analyzed.map(seq => seq[seq.length - 1]));
}
/**
 * Calculate previous value in sequence (Part 2)
 */
function calculatePrevious(row) {
    const analyzed = analyzeSequence([row]).reverse();
    return analyzed.reduce((acc, curr) => curr[0] - acc, 0);
}
const allNextP1 = rows.map(calculateNext);
const allPrevP2 = rows.map(calculatePrevious);
(0, index_1.cl)("-".repeat(20));
(0, index_1.cl)("p1");
(0, index_1.cl)(allNextP1);
(0, index_1.cl)(index_1.MathUtils.sum(allNextP1));
(0, index_1.cl)("-".repeat(20));
(0, index_1.cl)("p2");
(0, index_1.cl)(allPrevP2);
(0, index_1.cl)(index_1.MathUtils.sum(allPrevP2));
//# sourceMappingURL=app.js.map