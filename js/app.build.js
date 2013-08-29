({

  // TO RUN THE BUILD, GET TO THIS DIR AND RUN: node r.js -o app.build.js

  // The path of the dev files (main shouild be directly underneath this)
    baseUrl: ".",

  // Set a directory to move the build files to
  //dir: "build",

  // Output everything to one minified file
  out: "sr.min.js",

  // Comment out the below line to minify using UglifyJS
  //optimize: "none",

  // Build from the app folder (relative to baseUrl)
  name: "app",

  // Set paths for libs
  paths: {
    text: "lib/text",
    ga: "empty:",
    qunit: "empty:"
  }

})


