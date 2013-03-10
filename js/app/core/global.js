/*
  The main javascript global for Social Reader. 
    - builds the original global
    - adds the site details set server side
    - auto-saves to cache on change
    - gets data from cache if last saved within X mins
*/
define(["underscore",
        "backbone",
        "../modules/cache",
        "./widgets/template"],
        function (_, Backbone, Cache, Template) {

  // Create the cache
  var cache = new Cache({
    name: 'social_reader_cache'
  });

  var Global = Backbone.Model.extend({

    defaults: {
      'auto_sharing': true,
      'user': {},
      'activity': [],
      'friends': [],
      'isReady': false,
      'readyCallbacks': []
    },

    initialize: function() {
      this.setup_cache();
      this.set_preset_values();
      this.cache_on_change();
      this.whenReady();
    },

    // Build the cache and setup listeners
    setup_cache: function() {

      // See if we're recently rached
      this.set('is_cached', cache.exists());
      this.set('is_cached_recently', cache.is_recent());

      // Get cache and merge with existing attributes
      if (this.get('is_cached')) {
        this.attributes = _.extend(this.attributes, cache.fetch());
      }

    },

    // Save cache on any changes
    cache_on_change: function() {
      var _this = this;
      this.on('change', function() {
        cache.save(_.omit(
          _this.attributes,
          ['is_cached', 'is_cached_recently', 'isReady', 'readyCallbacks']
        ));
      });
    },

    // Take details set previously (server side) and set the parameters. (Overrides cache)
    set_preset_values: function() {
      var _this = this;
      var sr = _.clone(window._sr);
      _.each(_.omit(sr, 'ready'), function(option, key) {
        _this.set(key, option);
      });
    },

    // Run a template
    template: function(options) {
      options = _.extend(options, {
        plugin_url: this.get('site').plugin_url
      });
      new Template(options);
    },

    // Runs all callbacks when isReady changes
    whenReady: function(cb) {
      var _this = this;
      this.on('change:isReady', function() {
        if (_this.get('isReady') !== true) return;
        _.each(_this.get('readyCallbacks'), function(callback) {
          callback();
        });
      });
    },

    // Same as the function you'll find in the global declaration, but compatible AFTER initialization
    ready: function(cb) {
      // If already ready (i.e. entire plugin has loaded)
      if (this.get('isReady') === true) {
        cb();
      }
      // If not yet ready (i.e. global has initialized but not all data has been fetch)
      var callbacks = this.get('readyCallbacks');
      callbacks.push(cb);
      this.set({
        readyCallbacks: cb,
        silent: true
      });
    }

  });

  // Initialize 
  window._sr = new Global();
  return window._sr;

});