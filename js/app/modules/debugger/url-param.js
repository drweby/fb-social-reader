define(function() {

	var Param = {};

  Param.exists = function(parameter) {
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

  return Param;

});