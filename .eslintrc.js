module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    semi: 0,
    'max-len': ['error', {code: 80}],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'prettier/prettier': 'warn',
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
}
