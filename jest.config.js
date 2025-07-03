const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom', // Best for Next.js/React
  transform: {
    ...tsJestTransformCfg,
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    '^.+\\.(css|scss|sass)$': 'identity-obj-proxy',
    // Handle static assets
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    // Handle module aliases (adjust if you use @/ alias)
    '^@/(.*)$': '<rootDir>/app/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  collectCoverageFrom: [
    'app/**/*.{ts,tsx,js,jsx}',
    '!app/**/*.d.ts',
    '!app/**/types.{ts,tsx}',
  ],
};