module.exports = {
  "*/**/*.{ts,tsx}": [
    "npx eslint --fix",           // Runs ESLint and fixes errors
    "npm run format:fix",         // Runs Prettier to format code
  ]
};
