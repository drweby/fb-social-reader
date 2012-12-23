define(['require'], function() {

  var Cookie = {};


  Cookie.set = function(c_name, value, exdays) {
    var c_value, exdate;
    exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    c_value = escape(value) + (!(exdays != null) ? "" : "; expires=" + exdate.toUTCString());
    return document.cookie = c_name + "=" + c_value;
  };

  Cookie.get = function(c_name) {
    var ARRcookies, i, x, y;
    ARRcookies = document.cookie.split(";");
    i = 0;
    while (i < ARRcookies.length) {
      x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
      y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
      x = x.replace(/^\s+|\s+$/g, "");
      if (x === c_name) {
        return unescape(y);
      }
      i++;
    }
  };

  Cookie.exists = function(c_name) {
    var cookie = this.get(c_name);
    if (cookie != null) {
      return true;
    } else {
      return false;
    }
  };

  Cookie.remove = function(c_name) {
    return document.cookie = c_name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };

  return Cookie;


});
    