module.exports = {
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Test Report',
        includeFailureMsg: true,
        includeConsoleLog: true,
        useCssFile: true,
      },
    ],
  ],
};
