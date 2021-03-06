const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: (process.env.IS_CIRCLE ? ['--headless'] : [])
    }
  },
  directConnect: !process.env.IS_JENKINS,
  baseUrl: 'https://testing-angular-applications.github.io',

  // Jasmine
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare: ()=> {
    if (process.env.IS_JENKINS) {
      let jasmineReporters = require('jasmine-reporters');
      let junitReporter = new jasmineReporters.JUnitXmlReporter({
        savePath: 'output/',
        consolidateAll: false
      });
      jasmine.getEnv().addReporter(junitReporter);
    } else {
      let specReporter = new SpecReporter({
        spec: { displayStacktrace: true }
      });
      jasmine.getEnv().addReporter(specReporter);
    }
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  }
};