

/*
  Caching module with localStorage
*/
define(function() {

  var Cache = Backbone.Model.extend({

    // Cache life in seconds
    maxAge: 3000,

    initialize: function() {
      var self = this;

      // Get the data from localStorage and set it as properties of the model
      this.fetch();

      this.on("change", function(e) {
        self.save();
      });

    },

    set: function(obj, options) {
      var self = this;
      _.each(obj, function (value, key) {
        self.attributes[key] = value;
        self.trigger("change:"+key);
      });
      var persistent = (options && options.persistent) ? true : false;
      self.save(persistent);
    },

    // Updates cache key with the thing that's just changed
    save: function(persistent) {
      var self = this;
      _.each(this.changed, function (value, key) {
        var data = {
          key: key,
          data: value,
          updated: (new Date()).getTime()
        };
        if (persistent) {
          data[persistent] = true;
        }
        var cache = JSON.parse(window.localStorage.getItem("SocialReaderCache")) || {};
        cache[key] = data;
        window.localStorage.setItem("SocialReaderCache", JSON.stringify(cache));
      }); 
      this.trigger("save");
    },

    fetch: function() {
      var self = this;
      var data = JSON.parse(window.localStorage.getItem("SocialReaderCache"));
      _.each(data, function(value, key) {
        var oldestAllowedTime = (new Date()).getTime() - (self.maxAge * 1000);
        if (value.updated > oldestAllowedTime || value.persistent === true) {
          var data = {};
          data[value.key] = value.data;
          self.set(data);
        }
      });
      this.trigger("fetch");
    }

  });

  return new Cache();

});