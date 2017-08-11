module.exports = {
  parser: 'typescript-eslint-parser',
  plugins: [
    'typescript',
    'react'
  ],
  extends: [
    'xo-space/esnext',
    'xo-react/space',
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
