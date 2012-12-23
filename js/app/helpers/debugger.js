define(function() {

  var Debugger = {};

  Debugger.start = function() {
    if (this.check_parameter_exists('sr_debug')) {
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

  Debugger.check_parameter_exists = function(parameter) {
    var currentParameter, fullQString, i, paramArray, paramCount, queryStringComplete;
    fullQString = window.location.search.substring(1);
    paramCount = 0;
    queryStringComplete = "?";
    if (fullQString.length > 0) {
      paramArray = fullQString.split("&");
      i = 0;
      while (i < paramArray.length) {
        currentParameter = paramArray[i].split("=");
        if (currentParameter[0] === parameter) {
          return true;
        }
        i++;
      }
    }
    return false;
  };

  // Start the debugger and return
  Debugger.start();
  return Debugger;

});   


