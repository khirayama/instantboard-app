module.exports = {
  parser: 'typescript-eslint-parser',
  plugins: [
    'react',
  ],
  extends: [
    'xo-space/esnext',
  ],
  env: {
    node: true,
    browser: true,
  },
  rules: {
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'no-undef': 0
  },
};
