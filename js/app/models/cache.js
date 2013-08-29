/*
  Caching module with localStorage
*/
define(function() {

  var Cache = Backbone.Model.extend({

    initialize: function() {
      var self = this;

      // Get the data from localStorage and set it as properties of the model
      this.fetch();

      this.on("change", function() {
        self.save();
      });
    },

    // Updates cache key with the thing that's just changed
    save: function() {
      var self = this;
      _.each(this.changed, function (value, key) {
        var data = {
          key: key,
          data: value,
          updated: (new Date()).getTime()
        };
        var cache = JSON.parse(window.localStorage.getItem("SocialReaderCache")) || {};
        cache[key] = data;
        window.localStorage.setItem("SocialReaderCache", JSON.stringify(cache));
      }); 
    },

    fetch: function() {
      var self = this;
      var data = JSON.parse(window.localStorage.getItem("SocialReaderCache"));
      _.each(data, function(value, key) {
        self.set(value.key, value.data);
      });
    }

  });

  return new Cache();

});