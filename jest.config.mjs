import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  transform: {
    "\\.ts$": "esbuild-runner/jest"
  },
};

export default createJestConfig(customJestConfig);