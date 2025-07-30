module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests', '<rootDir>/utils'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/utils/(.*)$': '<rootDir>/utils/$1',
    '^@/utils$': '<rootDir>/utils/index',
  },
  collectCoverageFrom: [
    'utils/**/*.ts',
    '!utils/**/*.d.ts',
  ],
};