define(function(require) {

  var $         = require('jquery');
  var _         = require('underscore');
  var Listeners = require('./analytics-listeners');
  var SR        = require('app/core/global');


  var Analytics = {
    initialized: false,
    queue: []
  };

  Analytics.init = function() {
    var _this = this,
        user = SR.get('user'),
        site = SR.get('user');

    if (SR.get('site').analytics_disabled === true) {
      return false;
    } else {
    }

    window._gaq = window._gaq || [];
    window._gaq.push(['sr._setAccount', 'UA-37231887-1']);
    window._gaq.push(['sr.setCustomVar', 1, 'logged_in', user.logged_in, 2]);
    window._gaq.push(['sr.setCustomVar', 2, 'plugin_version', site.plugin_version, 2]);
    window._gaq.push(['sr._setDomainName', window.location.host]);
    window._gaq.push(['sr._trackPageview']);

    // Load script in after setting variables
    require(['ga'], function() {
      _this.initialized = true;
      _.each(_this.queue, function(type) {
        _this.setup_listeners(type);
      });
    });
  };

  Analytics.track_event = function(category, action, label) {
    if (SR.get('site').analytics_disabled === true) {
      return false;
    }
    window._gaq.push(['sr._trackEvent', category, action, label]);
  };

  Analytics.setup_listeners = function(type) {

    // If analytics hasn't yet been initialized, add to queue to they run when it has
    if (this.initialized === false) {
      this.queue.push(type);
    } else {
      var _this = this;
      var listeners = Listeners[type];
      if (!listeners) {
        return false;
      }
      _.each(listeners, function(listener) {
        _.each(listener.actions, function(action) {
          $(listener.selector).on(action, function() {
            _this.track_event(type, action, listener.label);
          });
        });
      });
    }

  };


  return Analytics;

});
