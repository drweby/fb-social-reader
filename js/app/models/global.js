/*
  The main javascript global for Social Reader. 
    - builds the original global
    - adds the site details set server side
    - auto-saves to cache on change
    - gets data from cache if last saved within X mins
*/
define(function (require) {

  var Backbone = require('backbone');

  var Global = Backbone.Model.extend({

    initialize: function() {

      // Save cache on any changes
      this.on('change', this.save_cache);

      // Get cache
      if (this.is_cached()) {
        this.attributes = this.get_cache();
      }

      // Get site details set server-side (overrides cached values)
      this.get_site_details();
      
    },

    // Take the window._sr_site variable set server side. Delete server side set one
    get_site_details: function() {
      this.set('site', window._sr_site);
      delete window._sr_site;
    },

    // Check to see if the data is cached (if saved within last 10 mins)
    is_cached: function() {
      var time = window.localStorage.getItem('social_reader_last_cache_time');
      var diff = ((new Date()).getTime() - time ) / 1000;
      return (diff<600) ? true : false;
    },

    // Update the cache in localStorage whenever the global is updated
    save_cache: function() {
      window.localStorage.setItem('social_reader_cache', JSON.stringify(this.attributes));
      window.localStorage.setItem('social_reader_last_cache_time', (new Date()).getTime());
    },

    // Get the cache from localStorage on load
    get_cache: function() {
      var json = window.localStorage.getItem('social_reader_cache');
      try {
        return JSON.parse(json);
      } catch (e) {
        return false;
      }
    }

  });

  window._sr = new Global();
  return window._sr;

});