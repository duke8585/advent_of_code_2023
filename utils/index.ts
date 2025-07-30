import * as fs from 'fs';

/**
 * Console logging utility - shorter alias for console.log
 */
export function cl(...args: any[]): void {
    console.log(...args);
}

/**
 * File reading utilities
 */
export class FileUtils {
    /**
     * Read file and split into lines
     */
    static readLines(filePath: string): string[] {
        const values = fs.readFileSync(filePath, 'utf-8');
        return values.split('\n').filter(line => line.trim() !== '');
    }

    /**
     * Read file and split by double newlines (useful for grouped input)
     */
    static readBlocks(filePath: string): string[] {
        const values = fs.readFileSync(filePath, 'utf-8');
        return values.split(/\n\s*\n/);
    }

    /**
     * Read file as raw string
     */
    static readRaw(filePath: string): string {
        return fs.readFileSync(filePath, 'utf-8');
    }
}

/**
 * String processing utilities
 */
export class StringUtils {
    /**
     * Reverse a string
     */
    static reverse(s: string): string {
        return s.split("").reverse().join("");
    }

    /**
     * Replace all occurrences using a map of replacements
     */
    static replaceAll(str: string, replacements: Map<string, string | number>): string {
        let result = str;
        for (const [find, replace] of replacements.entries()) {
            result = result.replace(new RegExp(find, 'g'), replace.toString());
        }
        return result;
    }

    /**
     * Extract the first numeric character from a string
     */
    static firstNumericChar(s: string): string {
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
    static countOccurrences<T extends string | number>(items: T[]): Record<string, number> {
        const counts: Record<string, number> = {};
        for (const item of items) {
            const key = String(item);
            counts[key] = (counts[key] || 0) + 1;
        }
        return counts;
    }
}

/**
 * Array utilities
 */
export class ArrayUtils {
    /**
     * Create a sliding window over an array
     */
    static sliding<T>(arr: T[], size: number, offset: number = 1): T[][] {
        const result: T[][] = [];
        for (let i = 0; i < arr.length - size + 1; i += offset) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    }

    /**
     * Create a range of numbers
     */
    static range(start: number, end: number): number[] {
        return Array.from({ length: end - start }, (_, i) => i + start);
    }

    /**
     * Zip two arrays together
     */
    static zip<T, U>(arr1: T[], arr2: U[]): [T, U][] {
        const length = Math.min(arr1.length, arr2.length);
        return Array.from({ length }, (_, i) => [arr1[i], arr2[i]]);
    }

    /**
     * Find intersection of two arrays
     */
    static intersection<T>(arr1: T[], arr2: T[]): T[] {
        const set1 = new Set(arr1);
        const set2 = new Set(arr2);
        return Array.from(set1).filter(x => set2.has(x));
    }

    /**
     * Group array elements by a key function
     */
    static groupBy<T, K extends string | number>(
        array: T[], 
        keyFn: (item: T) => K
    ): Record<K, T[]> {
        const groups = {} as Record<K, T[]>;
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
    static unique<T>(arr: T[]): T[] {
        return [...new Set(arr)];
    }
}

/**
 * Mathematical utilities
 */
export class MathUtils {
    /**
     * Sum an array of numbers
     */
    static sum(numbers: number[]): number {
        return numbers.reduce((acc, curr) => acc + curr, 0);
    }

    /**
     * Product of an array of numbers
     */
    static product(numbers: number[]): number {
        return numbers.reduce((acc, curr) => acc * curr, 1);
    }

    /**
     * Find minimum value in array
     */
    static min(numbers: number[]): number {
        return Math.min(...numbers);
    }

    /**
     * Find maximum value in array
     */
    static max(numbers: number[]): number {
        return Math.max(...numbers);
    }

    /**
     * Calculate power of 2
     */
    static pow2(exponent: number): number {
        return 2 ** exponent;
    }
}

/**
 * Parsing utilities
 */
export class ParseUtils {
    /**
     * Parse integers from a string, filtering out NaN values
     */
    static parseInts(str: string, delimiter: string = ' '): number[] {
        return str.split(delimiter)
            .map(s => parseInt(s.trim()))
            .filter(n => !isNaN(n));
    }

    /**
     * Parse numbers and filter empty strings
     */
    static parseNumbers(str: string, delimiter: string = ' '): number[] {
        return str.split(delimiter)
            .filter(s => s.trim() !== '')
            .map(s => parseInt(s.trim()))
            .filter(n => !isNaN(n));
    }

    /**
     * Extract numbers from a line using regex
     */
    static extractNumbers(line: string): number[] {
        const matches = line.match(/-?\d+/g);
        return matches ? matches.map(Number) : [];
    }
}

/**
 * Grid/2D utilities (common in AoC)
 */
export class GridUtils {
    /**
     * Create a 2D grid from lines
     */
    static fromLines(lines: string[]): string[][] {
        return lines.map(line => [...line]);
    }

    /**
     * Get all adjacent coordinates (4-directional)
     */
    static getAdjacent4(row: number, col: number): [number, number][] {
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
    static getAdjacent8(row: number, col: number): [number, number][] {
        return [
            [row - 1, col - 1], [row - 1, col], [row - 1, col + 1],
            [row, col - 1],                     [row, col + 1],
            [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]
        ];
    }

    /**
     * Check if coordinates are within grid bounds
     */
    static inBounds(grid: any[][], row: number, col: number): boolean {
        return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
    }
}

/**
 * Lookup table utilities (common pattern in AoC)
 */
export class LookupUtils {
    /**
     * Generic lookup function that maps a search value through lookup tables
     */
    static lookup(search: number, lookupTable: number[][]): number {
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
    static chainLookups(search: number, lookupTables: number[][][]): number {
        return lookupTables.reduce((acc, table) => this.lookup(acc, table), search);
    }
}