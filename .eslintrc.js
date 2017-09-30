module.exports = {
  'extends': 'airbnb',
  'rules': {
    'comma-dangle': ['error', 'never'],
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/anchor-is-valid': ['warn', { 'aspects': ['invalidHref'] }],
    'semi': ['error', 'never'],
    'linebreak-style': 0
  },
  'env': {
    'browser': true,
    'node': true,
    'jest/globals': true
  },
  'plugins': [
      'jest'
  ]
};
