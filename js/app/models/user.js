define(function(require) {

  var Global       = require("./global");
  var Facebook     = require("./facebook");
  // var Cookie    = require('app/helpers/cookie');
  // var Cache     = require('app/models/cache');


  var User = Backbone.Model.extend({

    initialize: function() {
      var self = this;

      var fb = new Facebook(Global.pick("appId", "channelUrl", "sdkDisabled"));

      fb.on("sdk_loaded", function() {
        fb.isLoggedIn();
      });

      fb.on("is_logged_in", function (isLoggedIn) {
        if (isLoggedIn) {
          fb.getUser();
          fb.getFriends();
        } else {
          self.trigger("not_logged_in");
        }
      });

      // Get both the user and friends, get activity afterwards
      var iterate = _.after(2, function() {
        fb.getActivity();
      });
      fb.on("fetch_user", function() {
        self.set("profile", fb.get("user"));
        iterate();
      });
      fb.on("fetch_friends", function() {
        self.set("friends", fb.get("friends"));
        iterate();
      });

      fb.on("fetch_activity", function() {
        self.set("activity", fb.get("activity"));
      });

    },

    // Queues read to Facebook. Returns true if queued, false if not.
    queue_read: function(cb) {
      if (window._sr.user.is_auto_sharing === true && window._sr.page.is_readable === true) {
        setTimeout(function() {
          Fb.add_read();
        }, 10000);
        return true;
      } else {
        return false;
      }
    },

    set_auto_sharing: function(bool) {
      var _this = this;
      window._sr.user.is_auto_sharing = bool;
      var user = window._sr.user;
      // Cache.save(user.id, 'user_cache', user);
    },

    login: function() {
      Fb.login(function() {
        window.location.reload();
      });
    },

    logout: function() {
      Fb.logout(function() {
        // Cache.clear_all();
        window.location.reload();
      });
    }


  });





  return new User();



});
