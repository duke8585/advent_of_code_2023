/**
 * Console logging utility - shorter alias for console.log
 */
export declare function cl(...args: any[]): void;
/**
 * File reading utilities
 */
export declare class FileUtils {
    /**
     * Read file and split into lines
     */
    static readLines(filePath: string): string[];
    /**
     * Read file and split by double newlines (useful for grouped input)
     */
    static readBlocks(filePath: string): string[];
    /**
     * Read file as raw string
     */
    static readRaw(filePath: string): string;
}
/**
 * String processing utilities
 */
export declare class StringUtils {
    /**
     * Reverse a string
     */
    static reverse(s: string): string;
    /**
     * Replace all occurrences using a map of replacements
     */
    static replaceAll(str: string, replacements: Map<string, string | number>): string;
    /**
     * Extract the first numeric character from a string
     */
    static firstNumericChar(s: string): string;
    /**
     * Count occurrences of each character/element in a string or array
     */
    static countOccurrences<T extends string | number>(items: T[]): Record<string, number>;
}
/**
 * Array utilities
 */
export declare class ArrayUtils {
    /**
     * Create a sliding window over an array
     */
    static sliding<T>(arr: T[], size: number, offset?: number): T[][];
    /**
     * Create a range of numbers
     */
    static range(start: number, end: number): number[];
    /**
     * Zip two arrays together
     */
    static zip<T, U>(arr1: T[], arr2: U[]): [T, U][];
    /**
     * Find intersection of two arrays
     */
    static intersection<T>(arr1: T[], arr2: T[]): T[];
    /**
     * Group array elements by a key function
     */
    static groupBy<T, K extends string | number>(array: T[], keyFn: (item: T) => K): Record<K, T[]>;
    /**
     * Remove duplicates from array
     */
    static unique<T>(arr: T[]): T[];
}
/**
 * Mathematical utilities
 */
export declare class MathUtils {
    /**
     * Sum an array of numbers
     */
    static sum(numbers: number[]): number;
    /**
     * Product of an array of numbers
     */
    static product(numbers: number[]): number;
    /**
     * Find minimum value in array
     */
    static min(numbers: number[]): number;
    /**
     * Find maximum value in array
     */
    static max(numbers: number[]): number;
    /**
     * Calculate power of 2
     */
    static pow2(exponent: number): number;
}
/**
 * Parsing utilities
 */
export declare class ParseUtils {
    /**
     * Parse integers from a string, filtering out NaN values
     */
    static parseInts(str: string, delimiter?: string): number[];
    /**
     * Parse numbers and filter empty strings
     */
    static parseNumbers(str: string, delimiter?: string): number[];
    /**
     * Extract numbers from a line using regex
     */
    static extractNumbers(line: string): number[];
}
/**
 * Grid/2D utilities (common in AoC)
 */
export declare class GridUtils {
    /**
     * Create a 2D grid from lines
     */
    static fromLines(lines: string[]): string[][];
    /**
     * Get all adjacent coordinates (4-directional)
     */
    static getAdjacent4(row: number, col: number): [number, number][];
    /**
     * Get all adjacent coordinates (8-directional)
     */
    static getAdjacent8(row: number, col: number): [number, number][];
    /**
     * Check if coordinates are within grid bounds
     */
    static inBounds(grid: any[][], row: number, col: number): boolean;
}
/**
 * Lookup table utilities (common pattern in AoC)
 */
export declare class LookupUtils {
    /**
     * Generic lookup function that maps a search value through lookup tables
     */
    static lookup(search: number, lookupTable: number[][]): number;
    /**
     * Apply multiple lookup tables in sequence
     */
    static chainLookups(search: number, lookupTables: number[][][]): number;
}
//# sourceMappingURL=index.d.ts.map