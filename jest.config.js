/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: "jsdom",
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/mocks/fileMock.js',
    '\\.(css|less)$': '<rootDir>/mocks/styleMock.js',
  },
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
  collectCoverage: true
};