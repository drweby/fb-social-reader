define(function(require) {

  var Debugger  = require('app/helpers/debugger');
  var _         = require('underscore');
  var Listeners = require('app/models/analytics-listeners');
  var $         = require('jquery');


  var Analytics = {
    initialized: false,
    queue: []
  };

  Analytics.init = function() {
    var _this = this, user = window._sr.user, site = window._sr.site;3
    Debugger.log('Starting analytics', 0);
    if (site.analytics_disabled === true) {
      Debugger.log('Analytics has been disabled on this site: STOP');
      return false;
    } else {
      Debugger.log('Analytics is enabled for this site');
    }
  
    window._gaq = window._gaq || [];
    window._gaq.push(['sr._setAccount', 'UA-37231887-1']);
    Debugger.log('Setting custom variables');
    window._gaq.push(['sr.setCustomVar', 1, 'logged_in', user.logged_in, 2]);
    window._gaq.push(['sr.setCustomVar', 2, 'plugin_version', site.plugin_version, 2]);
    window._gaq.push(['sr._setDomainName', window.location.host]);
    Debugger.log('Tracking pageview');
    window._gaq.push(['sr._trackPageview']);

    // Load script in after setting variables
    Debugger.log('Loading ga.js script');
    require(['ga'], function() {
      _this.initialized = true;
      _.each(_this.queue, function(type) {
        _this.setup_listeners(type);
      });
      Debugger.log('Finished');
    });
  };

  Analytics.track_event = function(category, action, label) {
    Debugger.log('Tracking: '+ category+ ', ' + action + ', ' + label);
    if (window._sr.site.analytics_disabled === true) {
      Debugger.log('Analytics has been disabled on this site: STOP');
      return false;
    }
    window._gaq.push(['sr._trackEvent', category, action, label]);
  };

  Analytics.setup_listeners = function(type) {
    
    // If analytics hasn't yet been initialized, add to queue to they run when it has
    if (this.initialized === false) {
      Debugger.log('Analytics not yet initialized, queue '+type);
      this.queue.push(type);
    } else {
      var _this = this;
      Debugger.log("Setting up '"+type+"' listeners", 0);
      var listeners = Listeners[type];
      if (!listeners) {
        Debugger.log('No listeners found');
        return false;
      }
      _.each(listeners, function(listener) {
        _.each(listener.actions, function(action) {
          Debugger.log("Setting up listener:");
          Debugger.log("category: '"+type+"'", 2);
          Debugger.log("action: '"+action+"'", 2);
          Debugger.log("label: '"+listener.label+"'", 2);
          Debugger.log("selector: '"+listener.selector+"'", 2);
          $(listener.selector).on(action, function() {
            _this.track_event(type, action, listener.label);
          });
        });
      });
    }

  };


  return Analytics;

});
