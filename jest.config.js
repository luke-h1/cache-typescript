/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  testMatch: ["<rootDir>/*.(test).{js,jsx,ts,tsx}"],
  verbose: true,
  testEnvironmentOptions: {
    url: "http://localhost:8000/",
  },
  resetMocks: true,
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "e2e"],
  transform: {
    "^.+\\.(ts|js)$": "ts-jest",
  },
};
module.exports = config;
