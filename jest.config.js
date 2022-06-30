module.exports = {
    testRegex: '__tests__/.+\\.test\\.js',
    transform: {
      '^.+\\.js(x?)$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!uuid)',
    ],
};
