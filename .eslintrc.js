// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'plugin:cypress/recommended'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
  },
  plugins: ['cypress'],
  ignorePatterns: ['dist/**'],
}
