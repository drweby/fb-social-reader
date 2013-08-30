define(function (require) {

  var Cache = require("./cache");


  var User = Backbone.Model.extend({

    defaults: {},

    isLoggedIn: function(cb) {
      var self = this;
      FB.getLoginStatus(function(response) {
        var loginStatus = (response.status === "connected") ? true : false;
        self.set("isLoggedIn", loginStatus);
        self.trigger("is_logged_in");
      });
    },

    login: function() {
      var self = this;
      FB.login((function(response) {
        self.trigger("login", response);
      }), {
        scope: "publish_actions"
      });
    },

    logout: function() {
      var self = this;
      FB.logout(function(response) {
        self.trigger("logout", response);
      });
    },

    isAutoSharing: function() {
      var isAutoSharing = Cache.get("autoSharing");
      if (!isAutoSharing) {
        Cache.set({
          autoSharing: true
        }, { persistent: true });
        isAutoSharing = true;
      }
      return isAutoSharing;
    },

    fetch: function() {

      var self = this;

      if (Cache.get("user")) {
        var me = Cache.get("user");
        me.autoSharing = self.isAutoSharing();
        self.set(me);
        self.trigger("fetch");
        return;
      }

      FB.api("/me?fields=id,name", function(me) {
        me.picture = "//graph.facebook.com/" + me.id + "/picture";
        me.autoSharing = self.isAutoSharing();
        Cache.set({ "user": me });
        self.set(me);
        self.trigger("fetch");
      });

    }

  });

  return User;

});