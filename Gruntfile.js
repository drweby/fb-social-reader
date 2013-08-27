var Package = require("./package.json");


module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    jshint: {
      all: [
        "js/admin.js",
        "js/main.js",
        "js/app/*.js",
        "js/app/*/*.js"
      ]
    }

    // qunit: {
    //   all: {
    //     options: {
    //       urls: ["tests/index.html"]
    //     }
    //   }
    // },


// current config settings for require
// ({

//   // TO RUN THE BUILD, GET TO THIS DIR AND RUN: node r.js -o app.build.js

//   // The path of the dev files (main shouild be directly underneath this)
//     baseUrl: '.',

//   // Set a directory to move the build files to
//   //dir: "build",

//   // Output everything to one minified file
//   out: 'sr.min.js',

//   // Comment out the below line to minify using UglifyJS
//   //optimize: "none",

//   // Build from the app folder (relative to baseUrl)
//   name: 'app',

//   // Set paths for libs
//   paths: {
//     underscore: 'lib/underscore-amd.min',
//     text: 'lib/text',
//     ga: 'empty:',
//     qunit: 'empty:'
//   }

// })



    requirejs: {
      compile: {
        options: {
          baseUrl: "src/js",
          name: "app/main",
          paths: {
            app: "app",
            underscore: "empty:",
            require: "lib/require",
            core_data: "lib/core_data"
          },
          out: "src/js/schema.min.js",
          wrap: {
            startFile: "src/js/start.frag",
            endFile: "src/js/end.frag"
          },
          // optimize: "none",
          uglify: "uglify2",
          preserveLicenseComments: false,
          onBuildWrite: function(id, path, contents) {
            // Remove all the AMD/requirejs wrapping. Shamelessly
            // poached from QTracker, who shamelessly poached it from Modernizr.
            if ((/define\((.|\n)*?\{/).test(contents)) {
              contents = contents.replace(/define\((.|\n)*?\{/, "");
              contents = contents.replace(/\}\);\s*?$/,"");
              contents = contents.replace(/return.*[^return]*$/,"");
            }
            else if ((/require\([^\{]*?\{/).test(contents)) {
              contents = contents.replace(/require[^\{]+\{/, "");
              contents = contents.replace(/\}\);\s*$/,"");
            }
            return contents;
          }
        }
      }
    },

  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  // grunt.loadNpmTasks("grunt-contrib-qunit");
  grunt.loadNpmTasks("grunt-contrib-requirejs");

  // Type `grunt` to lint and minify
  grunt.registerTask("default", ["jshint", "requirejs"]);

  // Type `grunt deploy` to deploy modules to S3/Cloudfront
  // NOTE: the directory files are uploaded to depends on the version specified
  // in `modules` of package.json
  grunt.registerTask("deploy", ["s3"]);

};