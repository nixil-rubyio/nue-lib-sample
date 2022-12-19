module.exports = {
  "roots": [
    "<rootDir>/src",
  ],
  "transform": {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  "transformIgnorePatterns": [
    "node_modules/(?!(react-native|ruby-pricing-calculator|react-native-button)/)"
  ],
  testEnvironment: 'jsdom',
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleNameMapper": {
    "@nue/ui-lib-sample": "<rootDir>/src",
  },
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  testTimeout: 60000,
  "preset": 'ts-jest',
}
