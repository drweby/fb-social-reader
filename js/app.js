// For any third party dependencies, like jQuery, place them in the lib folder.


// Get absolute directory
var appUrl = require.toUrl('app');
var arr = appUrl.split('/');
arr.pop();
var dir = arr.join('/');

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
require.config({
  baseUrl: dir+'/lib',
  paths: {
    app: dir+'/app'
    // jquery: "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min",
    // underscore: "//dd6zx4ibq538k.cloudfront.net/static/lodash.min"
  }
  // shim: {
  //   jquery: {
  //     exports: "jQuery",
  //     init: function() {
  //       debugger;
  //       return window.$.noConflict(!0);
  //     }
  //   },
  //   underscore: {
  //     exports: "_",
  //     init: function() {
  //       return window._.noConflict();
  //     }
  //   }
  // }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/main']);
