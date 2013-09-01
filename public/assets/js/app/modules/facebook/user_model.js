define(function (require) {

  var Cache = require("./cache");


  var User = Backbone.Model.extend({

    defaults: {},

    initialize: function() {

      // Cache when auto sharing changes
      this.on("change:autoSharing", function() {
        Cache.set(
          { autoSharing: this.get("autoSharing") },
          { persistent: true }
        );
      });      

    },

    isLoggedIn: function(cb) {
      var self = this;
      FB.getLoginStatus(function(response) {
        var loginStatus = (response.status === "connected") ? true : false;
        self.set("loggedIn", loginStatus);
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
      if (isAutoSharing === undefined) {
        this.set({ "autoSharing": true });
      } else {
        this.set({ "autoSharing": isAutoSharing }, { silent: true });
      }
    },

    fetch: function() {

      var self = this;

      if (Cache.get("user")) {
        var me = Cache.get("user");
        self.isAutoSharing();
        self.set(me);
        self.trigger("fetch");
        return;
      }

      FB.api("/me?fields=id,name", function(me) {
        me.picture = "//graph.facebook.com/" + me.id + "/picture";
        self.isAutoSharing();
        me.link = "//facebook.com/profile.php?id="+me.id;
        Cache.set({ "user": me });
        self.set(me);
        self.trigger("fetch");
      });

    }

  });

  return User;

});