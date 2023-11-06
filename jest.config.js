import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {};

module.exports = createJestConfig(customJestConfig);