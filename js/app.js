// For any third party dependencies, like jQuery, place them in the lib folder.

// Get absolute directory
var appUrl = require.toUrl('app');
var arr = appUrl.split('/');
arr.pop();
var dir = arr.join('/');

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
  baseUrl: dir,
  paths: {
    app: dir+'/app',
    underscore: dir+'/lib/underscore-amd.min',
    ga: 'https://google-analytics.com/ga',
    text: dir+'/lib/text',
    jquery: dir+'/lib/jquery',
    jquery_cdn: 'https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min',
    json2: 'http://cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2.min'
  }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/main']);
