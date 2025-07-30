"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../utils/index");
// Mock console.log for testing
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
describe('Utils Library Tests', () => {
    beforeEach(() => {
        mockConsoleLog.mockClear();
    });
    afterAll(() => {
        mockConsoleLog.mockRestore();
    });
    describe('cl function', () => {
        it('should call console.log with arguments', () => {
            (0, index_1.cl)('test', 123, { key: 'value' });
            expect(mockConsoleLog).toHaveBeenCalledWith('test', 123, { key: 'value' });
        });
    });
    describe('StringUtils', () => {
        describe('reverse', () => {
            it('should reverse a string', () => {
                expect(index_1.StringUtils.reverse('hello')).toBe('olleh');
                expect(index_1.StringUtils.reverse('123')).toBe('321');
                expect(index_1.StringUtils.reverse('')).toBe('');
            });
        });
        describe('replaceAll', () => {
            it('should replace all occurrences using a map', () => {
                const replacements = new Map([
                    ['one', 1],
                    ['two', 2],
                    ['three', 3]
                ]);
                const result = index_1.StringUtils.replaceAll('one two three one', replacements);
                expect(result).toBe('1 2 3 1');
            });
        });
        describe('firstNumericChar', () => {
            it('should find the first numeric character', () => {
                expect(index_1.StringUtils.firstNumericChar('abc123')).toBe('1');
                expect(index_1.StringUtils.firstNumericChar('7abc')).toBe('7');
                expect(index_1.StringUtils.firstNumericChar('abc')).toBe('0');
            });
        });
        describe('countOccurrences', () => {
            it('should count occurrences of each item', () => {
                const result = index_1.StringUtils.countOccurrences(['a', 'b', 'a', 'c', 'b', 'a']);
                expect(result).toEqual({ 'a': 3, 'b': 2, 'c': 1 });
            });
        });
    });
    describe('ArrayUtils', () => {
        describe('sliding', () => {
            it('should create sliding windows with default offset', () => {
                const result = index_1.ArrayUtils.sliding([1, 2, 3, 4, 5], 2);
                expect(result).toEqual([[1, 2], [2, 3], [3, 4], [4, 5]]);
            });
            it('should create sliding windows with custom offset', () => {
                const result = index_1.ArrayUtils.sliding([1, 2, 3, 4, 5, 6], 2, 2);
                expect(result).toEqual([[1, 2], [3, 4], [5, 6]]);
            });
        });
        describe('range', () => {
            it('should create a range of numbers', () => {
                expect(index_1.ArrayUtils.range(0, 5)).toEqual([0, 1, 2, 3, 4]);
                expect(index_1.ArrayUtils.range(3, 7)).toEqual([3, 4, 5, 6]);
                expect(index_1.ArrayUtils.range(5, 5)).toEqual([]);
            });
        });
        describe('zip', () => {
            it('should zip two arrays together', () => {
                const result = index_1.ArrayUtils.zip([1, 2, 3], ['a', 'b', 'c']);
                expect(result).toEqual([[1, 'a'], [2, 'b'], [3, 'c']]);
            });
            it('should handle arrays of different lengths', () => {
                const result = index_1.ArrayUtils.zip([1, 2], ['a', 'b', 'c']);
                expect(result).toEqual([[1, 'a'], [2, 'b']]);
            });
        });
        describe('intersection', () => {
            it('should find intersection of two arrays', () => {
                const result = index_1.ArrayUtils.intersection([1, 2, 3, 4], [3, 4, 5, 6]);
                expect(result).toEqual([3, 4]);
            });
        });
        describe('groupBy', () => {
            it('should group array elements by key function', () => {
                const items = [
                    { type: 'fruit', name: 'apple' },
                    { type: 'vegetable', name: 'carrot' },
                    { type: 'fruit', name: 'banana' }
                ];
                const result = index_1.ArrayUtils.groupBy(items, item => item.type);
                expect(result).toEqual({
                    'fruit': [
                        { type: 'fruit', name: 'apple' },
                        { type: 'fruit', name: 'banana' }
                    ],
                    'vegetable': [
                        { type: 'vegetable', name: 'carrot' }
                    ]
                });
            });
        });
        describe('unique', () => {
            it('should remove duplicates', () => {
                expect(index_1.ArrayUtils.unique([1, 2, 2, 3, 1, 4])).toEqual([1, 2, 3, 4]);
                expect(index_1.ArrayUtils.unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
            });
        });
    });
    describe('MathUtils', () => {
        describe('sum', () => {
            it('should sum an array of numbers', () => {
                expect(index_1.MathUtils.sum([1, 2, 3, 4, 5])).toBe(15);
                expect(index_1.MathUtils.sum([])).toBe(0);
            });
        });
        describe('product', () => {
            it('should calculate product of array', () => {
                expect(index_1.MathUtils.product([1, 2, 3, 4])).toBe(24);
                expect(index_1.MathUtils.product([2, 5])).toBe(10);
                expect(index_1.MathUtils.product([])).toBe(1);
            });
        });
        describe('min', () => {
            it('should find minimum value', () => {
                expect(index_1.MathUtils.min([3, 1, 4, 1, 5])).toBe(1);
                expect(index_1.MathUtils.min([10])).toBe(10);
            });
        });
        describe('max', () => {
            it('should find maximum value', () => {
                expect(index_1.MathUtils.max([3, 1, 4, 1, 5])).toBe(5);
                expect(index_1.MathUtils.max([10])).toBe(10);
            });
        });
        describe('pow2', () => {
            it('should calculate power of 2', () => {
                expect(index_1.MathUtils.pow2(0)).toBe(1);
                expect(index_1.MathUtils.pow2(3)).toBe(8);
                expect(index_1.MathUtils.pow2(10)).toBe(1024);
            });
        });
    });
    describe('ParseUtils', () => {
        describe('parseInts', () => {
            it('should parse integers from string', () => {
                expect(index_1.ParseUtils.parseInts('1 2 3 4')).toEqual([1, 2, 3, 4]);
                expect(index_1.ParseUtils.parseInts('1,2,3', ',')).toEqual([1, 2, 3]);
            });
        });
        describe('parseNumbers', () => {
            it('should parse numbers and filter empty strings', () => {
                expect(index_1.ParseUtils.parseNumbers('1  2   3 4')).toEqual([1, 2, 3, 4]);
                expect(index_1.ParseUtils.parseNumbers('1,,2,3', ',')).toEqual([1, 2, 3]);
            });
        });
        describe('extractNumbers', () => {
            it('should extract all numbers from a line', () => {
                expect(index_1.ParseUtils.extractNumbers('Game 1: 3 blue, 4 red')).toEqual([1, 3, 4]);
                expect(index_1.ParseUtils.extractNumbers('negative -5 and positive 10')).toEqual([-5, 10]);
            });
        });
    });
    describe('GridUtils', () => {
        describe('fromLines', () => {
            it('should create 2D grid from lines', () => {
                const lines = ['abc', 'def'];
                const result = index_1.GridUtils.fromLines(lines);
                expect(result).toEqual([['a', 'b', 'c'], ['d', 'e', 'f']]);
            });
        });
        describe('getAdjacent4', () => {
            it('should get 4-directional adjacent coordinates', () => {
                const result = index_1.GridUtils.getAdjacent4(1, 1);
                expect(result).toEqual([[0, 1], [2, 1], [1, 0], [1, 2]]);
            });
        });
        describe('getAdjacent8', () => {
            it('should get 8-directional adjacent coordinates', () => {
                const result = index_1.GridUtils.getAdjacent8(1, 1);
                expect(result).toEqual([
                    [0, 0], [0, 1], [0, 2],
                    [1, 0], [1, 2],
                    [2, 0], [2, 1], [2, 2]
                ]);
            });
        });
        describe('inBounds', () => {
            it('should check if coordinates are in bounds', () => {
                const grid = [[1, 2, 3], [4, 5, 6]];
                expect(index_1.GridUtils.inBounds(grid, 0, 0)).toBe(true);
                expect(index_1.GridUtils.inBounds(grid, 1, 2)).toBe(true);
                expect(index_1.GridUtils.inBounds(grid, -1, 0)).toBe(false);
                expect(index_1.GridUtils.inBounds(grid, 2, 0)).toBe(false);
                expect(index_1.GridUtils.inBounds(grid, 0, 3)).toBe(false);
            });
        });
    });
    describe('LookupUtils', () => {
        describe('lookup', () => {
            it('should perform lookup mapping', () => {
                // dest, src, len
                const lookupTable = [[50, 98, 2], [52, 50, 48]];
                expect(index_1.LookupUtils.lookup(79, lookupTable)).toBe(81); // maps through second rule
                expect(index_1.LookupUtils.lookup(14, lookupTable)).toBe(14); // no mapping, returns itself
                expect(index_1.LookupUtils.lookup(99, lookupTable)).toBe(51); // maps through first rule
            });
        });
        describe('chainLookups', () => {
            it('should chain multiple lookup tables', () => {
                const table1 = [[50, 98, 2], [52, 50, 48]];
                const table2 = [[0, 15, 37], [37, 52, 2]];
                const result = index_1.LookupUtils.chainLookups(79, [table1, table2]);
                // 79 -> 81 (via table1) -> 81 (no mapping in table2)
                expect(result).toBe(81);
            });
        });
    });
});
//# sourceMappingURL=utils.test.js.map