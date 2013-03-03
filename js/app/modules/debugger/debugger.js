define(['app/helpers/url-param'], function(Param) {

  var Debugger = {};

  Debugger.start = function() {
    if (Param.exists('sr_debug')) {
      this.debug_mode = true;
      return console.log("***********************************************\n* Welcome to the Social Reader debug console! *\n***********************************************");
    } else {
      return this.debug_mode = false;
    }
  };

  Debugger.log = function(message, indent) {
    if (indent == null) {
      indent = 1;
    }
    if (this.debug_mode === true) {
      if (indent === 1) {
        return console.log("  * " + message);
      } else if (indent === 2) {
        return console.log("    - "+message);
      } else if (indent === 0) {
        return console.log("\n" + message + ":");
      }
    }
  };

  // Start the debugger and return
  Debugger.start();
  return Debugger;

});


