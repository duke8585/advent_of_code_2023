import { cl, FileUtils, ArrayUtils, MathUtils } from '../../utils/index';

const rows = FileUtils.readLines('./inp.txt')
    .map(row => row.split(" ").map(num => parseInt(num)));

/**
 * Recursively analyze sequence differences until all differences are the same
 */
function analyzeSequence(seq: number[][]): number[][] {
    const lastSequence = seq[seq.length - 1];
    const diffs = ArrayUtils.sliding(lastSequence, 2, 1)
        .map(pair => pair[1] - pair[0])
        .filter(diff => !isNaN(diff));
    
    seq.push(diffs);
    
    // Check if all differences are the same (base case)
    if (ArrayUtils.unique(diffs).length === 1) {
        return seq;
    } else {
        return analyzeSequence(seq);
    }
}

/**
 * Calculate next value in sequence (Part 1)
 */
function calculateNext(row: number[]): number {
    const analyzed = analyzeSequence([row]);
    return MathUtils.sum(analyzed.map(seq => seq[seq.length - 1]));
}

/**
 * Calculate previous value in sequence (Part 2)
 */
function calculatePrevious(row: number[]): number {
    const analyzed = analyzeSequence([row]).reverse();
    return analyzed.reduce((acc, curr) => curr[0] - acc, 0);
}

const allNextP1 = rows.map(calculateNext);
const allPrevP2 = rows.map(calculatePrevious);

cl("-".repeat(20));
cl("p1");
cl(allNextP1);
cl(MathUtils.sum(allNextP1));

cl("-".repeat(20));
cl("p2");
cl(allPrevP2);
cl(MathUtils.sum(allPrevP2));
