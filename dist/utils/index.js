"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LookupUtils = exports.GridUtils = exports.ParseUtils = exports.MathUtils = exports.ArrayUtils = exports.StringUtils = exports.FileUtils = void 0;
exports.cl = cl;
const fs = __importStar(require("fs"));
/**
 * Console logging utility - shorter alias for console.log
 */
function cl(...args) {
    console.log(...args);
}
/**
 * File reading utilities
 */
class FileUtils {
    /**
     * Read file and split into lines
     */
    static readLines(filePath) {
        const values = fs.readFileSync(filePath, 'utf-8');
        return values.split('\n').filter(line => line.trim() !== '');
    }
    /**
     * Read file and split by double newlines (useful for grouped input)
     */
    static readBlocks(filePath) {
        const values = fs.readFileSync(filePath, 'utf-8');
        return values.split(/\n\s*\n/);
    }
    /**
     * Read file as raw string
     */
    static readRaw(filePath) {
        return fs.readFileSync(filePath, 'utf-8');
    }
}
exports.FileUtils = FileUtils;
/**
 * String processing utilities
 */
class StringUtils {
    /**
     * Reverse a string
     */
    static reverse(s) {
        return s.split("").reverse().join("");
    }
    /**
     * Replace all occurrences using a map of replacements
     */
    static replaceAll(str, replacements) {
        let result = str;
        for (const [find, replace] of replacements.entries()) {
            result = result.replace(new RegExp(find, 'g'), replace.toString());
        }
        return result;
    }
    /**
     * Extract the first numeric character from a string
     */
    static firstNumericChar(s) {
        const chars = [...s];
        for (const char of chars) {
            const num = parseInt(char);
            if (!Number.isNaN(num)) {
                return num.toString();
            }
        }
        return '0'; // fallback
    }
    /**
     * Count occurrences of each character/element in a string or array
     */
    static countOccurrences(items) {
        const counts = {};
        for (const item of items) {
            const key = String(item);
            counts[key] = (counts[key] || 0) + 1;
        }
        return counts;
    }
}
exports.StringUtils = StringUtils;
/**
 * Array utilities
 */
class ArrayUtils {
    /**
     * Create a sliding window over an array
     */
    static sliding(arr, size, offset = 1) {
        const result = [];
        for (let i = 0; i < arr.length - size + 1; i += offset) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    }
    /**
     * Create a range of numbers
     */
    static range(start, end) {
        return Array.from({ length: end - start }, (_, i) => i + start);
    }
    /**
     * Zip two arrays together
     */
    static zip(arr1, arr2) {
        const length = Math.min(arr1.length, arr2.length);
        return Array.from({ length }, (_, i) => [arr1[i], arr2[i]]);
    }
    /**
     * Find intersection of two arrays
     */
    static intersection(arr1, arr2) {
        const set1 = new Set(arr1);
        const set2 = new Set(arr2);
        return Array.from(set1).filter(x => set2.has(x));
    }
    /**
     * Group array elements by a key function
     */
    static groupBy(array, keyFn) {
        const groups = {};
        for (const item of array) {
            const key = keyFn(item);
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(item);
        }
        return groups;
    }
    /**
     * Remove duplicates from array
     */
    static unique(arr) {
        return [...new Set(arr)];
    }
}
exports.ArrayUtils = ArrayUtils;
/**
 * Mathematical utilities
 */
class MathUtils {
    /**
     * Sum an array of numbers
     */
    static sum(numbers) {
        return numbers.reduce((acc, curr) => acc + curr, 0);
    }
    /**
     * Product of an array of numbers
     */
    static product(numbers) {
        return numbers.reduce((acc, curr) => acc * curr, 1);
    }
    /**
     * Find minimum value in array
     */
    static min(numbers) {
        return Math.min(...numbers);
    }
    /**
     * Find maximum value in array
     */
    static max(numbers) {
        return Math.max(...numbers);
    }
    /**
     * Calculate power of 2
     */
    static pow2(exponent) {
        return 2 ** exponent;
    }
}
exports.MathUtils = MathUtils;
/**
 * Parsing utilities
 */
class ParseUtils {
    /**
     * Parse integers from a string, filtering out NaN values
     */
    static parseInts(str, delimiter = ' ') {
        return str.split(delimiter)
            .map(s => parseInt(s.trim()))
            .filter(n => !isNaN(n));
    }
    /**
     * Parse numbers and filter empty strings
     */
    static parseNumbers(str, delimiter = ' ') {
        return str.split(delimiter)
            .filter(s => s.trim() !== '')
            .map(s => parseInt(s.trim()))
            .filter(n => !isNaN(n));
    }
    /**
     * Extract numbers from a line using regex
     */
    static extractNumbers(line) {
        const matches = line.match(/-?\d+/g);
        return matches ? matches.map(Number) : [];
    }
}
exports.ParseUtils = ParseUtils;
/**
 * Grid/2D utilities (common in AoC)
 */
class GridUtils {
    /**
     * Create a 2D grid from lines
     */
    static fromLines(lines) {
        return lines.map(line => [...line]);
    }
    /**
     * Get all adjacent coordinates (4-directional)
     */
    static getAdjacent4(row, col) {
        return [
            [row - 1, col],
            [row + 1, col],
            [row, col - 1],
            [row, col + 1]
        ];
    }
    /**
     * Get all adjacent coordinates (8-directional)
     */
    static getAdjacent8(row, col) {
        return [
            [row - 1, col - 1], [row - 1, col], [row - 1, col + 1],
            [row, col - 1], [row, col + 1],
            [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]
        ];
    }
    /**
     * Check if coordinates are within grid bounds
     */
    static inBounds(grid, row, col) {
        return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
    }
}
exports.GridUtils = GridUtils;
/**
 * Lookup table utilities (common pattern in AoC)
 */
class LookupUtils {
    /**
     * Generic lookup function that maps a search value through lookup tables
     */
    static lookup(search, lookupTable) {
        for (const [dest, src, len] of lookupTable) {
            const lower = src;
            const upper = src + len;
            if (lower <= search && search < upper) {
                return dest + (search - lower);
            }
        }
        return search; // default if not found
    }
    /**
     * Apply multiple lookup tables in sequence
     */
    static chainLookups(search, lookupTables) {
        return lookupTables.reduce((acc, table) => this.lookup(acc, table), search);
    }
}
exports.LookupUtils = LookupUtils;
//# sourceMappingURL=index.js.map