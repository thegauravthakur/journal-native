module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'prettier/prettier': 0,
    'jsx-quotes': ['error', 'prefer-single'],
    'react-native/no-inline-styles': 0,
    'no-trailing-spaces': 0,
  },
  plugins: ['only-warn'],
};
