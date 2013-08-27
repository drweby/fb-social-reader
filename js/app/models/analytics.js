define(function(require) {

  var Analytics = {
    initialized: false,
  };

  Analytics.init = function() {
    var _this = this, user = window._sr.user, site = window._sr.site;

    if (site.analytics_disabled === true) {
      return false;
    } 

    window._gaq = window._gaq || [];
    window._gaq.push(["sr._setAccount", "UA-37231887-1"]);
    window._gaq.push(["sr._setDomainName", window.location.host]);
    window._gaq.push(["sr._trackPageview"]);

    // Load script in after setting variables
    require(["ga"], function() {
      _this.initialized = true;
    });
  };

  Analytics.track_event = function(category, action, label) {
    if (window._sr.site.analytics_disabled === true) {
      return false;
    }
    window._gaq.push(["sr._trackEvent", category, action, label]);
  };


  return Analytics;

});
