define(["backbone"],
        function (Backbone) {

  var Cache = Backbone.Model.extend({

    // Check to see if the data is cached at all
    exists: function() {
      if (window.localStorage.getItem(this.get('name')) !== null && window.localStorage.getItem(this.get('name')+'_last_update') !== null) {
        return true;
      } else {
        return false;
      }
    },

    // Check to see if the data is cached (if saved within last 10 mins)
    is_recent: function() {
      if (this.exists() === false) return false;
      var time = window.localStorage.getItem(this.get('name')+'_last_update');
      var diff = ((new Date()).getTime() - time ) / 1000;
      return (diff<600) ? true : false;
    },

    // Update the cache in localStorage whenever the global is updated
    save: function(data) {
      window.localStorage.setItem(this.get('name'), JSON.stringify(data));
      window.localStorage.setItem(this.get('name')+'_last_update', (new Date()).getTime());
    },

    // Get the cache from localStorage on load
    fetch: function() {
      var json = window.localStorage.getItem(this.get('name'));
      try {
        return JSON.parse(json);
      } catch (e) {
        return false;
      }
    },

    // Clear
    wipe: function() {
      delete window.localStorage[this.get('name')];
      delete window.localStorage[this.get('name')+'_last_update'];
    }

  });

  return Cache;

});