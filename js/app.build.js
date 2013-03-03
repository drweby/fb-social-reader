({

  // TO RUN THE BUILD, GET TO THIS DIR AND RUN: node r.js -o app.build.js

  // The path of the dev files (main shouild be directly underneath this)
  baseUrl: '.',

  preserveLicenseComments: false,

  // Output everything to one minified file
  out: 'sr.min.js',

  // Comment out the below line to stop minifying using UglifyJS
  //optimize: "none",

  // Build from the app folder (relative to baseUrl)
  name: 'app',

  // Set paths for libs
  paths: {
    jquery: 'lib/jquery',
    backbone: 'lib/backbone',
    underscore: 'lib/underscore',
    text: 'lib/text',
    tpl: 'lib/tpl',
    ga: 'empty:',
    qunit: 'empty:'
  }

})


