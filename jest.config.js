/** @type {import('jest').Config} */
const config = {
    coverageThreshold: {
      global: {
        branches: 50,
        functions: 50,
        lines: 50,
      },
    },
  };
  
  module.exports = config;