// conf.js
exports.config = {
  framework: 'jasmine',
  jasmineNodeOpts: {defaultTimeoutInterval: 100000}, //sets the timeout to be a little longer 
  directConnect: true,
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec.js'],
  plugins: [{
  	path : 'node_modules/aurelia-protractor-plugin/index.js'
  }],
  capabilities: {
  	'browserName' : 'chrome'
  },

  /*onPrepare:function(){
    global.numerator = require('protractor-numerator').numerator;
    protractor.ElementArrayFinder.prototype = Object.assign(
            protractor.ElementArrayFinder.prototype, numerator);
  }*/

}