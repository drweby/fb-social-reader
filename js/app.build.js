({

  // TO RUN THE BUILD, GET TO THIS DIR AND RUN: node r.js -o app.build.js

  // The path of the dev files (main shouild be directly underneath this)
  baseUrl: '.',

  // Output everything to one minified file
  out: 'sr.min.js',

  // Build from the app folder (relative to baseUrl)
  // name: 'app/main',
  name: 'app',

  // Set paths for libs
  paths: {
    jquery: 'lib/jquery',
    backbone: 'lib/backbone',
    underscore: 'lib/underscore',
    tpl: 'lib/tpl',
    ga: 'empty:'
  },

  preserveLicenseComments: false,

  // onBuildWrite: function(id, path, contents) {
  //   // Remove all the AMD/requirejs wrapping. Shamelessly
  //   // poached from Modernizr.
  //   if ((/define\((.|\n)*?\{/).test(contents)) {
  //     contents = contents.replace(/define\((.|\n)*?\{/, '');

  //     contents = contents.replace(/\}\);\s*?$/,'');

  //     contents = contents.replace(/return.*[^return]*$/,'');
  //   }
  //   else if ((/require\([^\{]*?\{/).test(contents)) {
  //     contents = contents.replace(/require[^\{]+\{/, '');
  //     contents = contents.replace(/\}\);\s*$/,'');
  //   }
  //   return contents;
  // },

  // Comment out the below line to stop minifying using UglifyJS
  optimize: "uglify"

})


