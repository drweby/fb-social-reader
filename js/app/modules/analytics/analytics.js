define(function(require) {

  var Analytics = {
    initialized: false,
  };

  Analytics.init = function() {
    var self = this;

    if (site.analytics_disabled === true) {
      return false;
    } 

    window._gaq = window._gaq || [];
    window._gaq.push(["sr._setAccount", "UA-37231887-1"]);
    window._gaq.push(["sr._setDomainName", window.location.host]);
    window._gaq.push(["sr._trackPageview"]);

    // Load script in after setting variables
    require(["ga"], function() {
      self.initialized = true;
    });
  };


  return Analytics;

});
