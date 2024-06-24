// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'plugin:cypress/recommended'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    'no-only-tests/no-only-tests': [
      'error',
      {
        focus: ['only', 'skip'],
      },
    ],
  },
  plugins: ['cypress', 'no-only-tests'],
  ignorePatterns: ['dist/**'],
}
