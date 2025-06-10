module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/app/__tests__/setup.js'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};