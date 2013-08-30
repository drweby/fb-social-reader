define(function (require) {

  var UserModel          = require("./user_model");
  var FriendsCollection  = require("./friends_collection");
  var ActivityCollection = require("./activity_collection");

  var $ = jQuery;

  var Facebook = Backbone.Model.extend({

    initialize: function() {
      this.user     = new UserModel();
      this.friends  = new FriendsCollection();
      this.activity = new ActivityCollection();
      this.loadSdk();
    },

    loadSdk: function() {

      var self = this;

      if (!this.get("appId")) {
        return false;
      }

      if (this.get("sdkDisabled") === true) {
        this.sdk_check_count = 0;
        this.waitForFb(function() {
          self.set("sdkLoaded", true);
          self.trigger("sdk_loaded");
        });
      } else {

        // Add root div
        $("body").prepend("<div id=\"fb-root\"></div>");

        window.fbAsyncInit = function() {

          // Start up
          FB.init({
            appId: self.get("appId"),
            channelUrl: self.get("channelUrl"),
            status: true,
            cookie: true,
            xfbml: true
          });

          // Trigger complete
          self.set("sdkLoaded", true);
          self.trigger("sdk_loaded");

        };

        // Load the sdk
        (function(d, debug) {
          var id, js, ref;
          js = void 0;
          id = "facebook-jssdk";
          ref = d.getElementsByTagName("script")[0];
          if (d.getElementById(id)) {
            return;
          }
          js = d.createElement("script");
          js.id = id;
          js.async = true;
          js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
          return ref.parentNode.insertBefore(js, ref);
        })(window.document, false);

      }

    },

    waitForFb: function (cb) {
      this.sdk_check_count++;
      if (this.sdk_check_count > 10) {
        return;
      }
      var self = this;
      if (window.FB) {
         if ($("#fb-root").length === 1) {
          cb();
        } else {
          setTimeout(function() {
            self.waitForFb();
          }, 100);
        }
      } else {
        setTimeout(function() {
          self.waitForFb();
        }, 100);
      }
    },


    fetch: function() {
      var self = this;

      // Check we're logged in after SDK loads
      self.on("sdk_loaded", function() {
        self.user.isLoggedIn();
      });

      // Get user and friends
      self.user.on("is_logged_in", function () {
        if (self.user.get("isLoggedIn")) {
          self.user.fetch();
          self.friends.fetch();
        } else {
          self.trigger("not_logged_in");
        }
      });

      // Get both the user and friends, get activity afterwards
      // var iterate = _.after(2, function() {
      //   self.fetchActivity();
      //   self.activity.on("fetch", function() {
      //     self.trigger("fetch_activity");
      //   });
      // });
      self.user.on("fetch", function() {
        self.trigger("fetch_user");
        // iterate();
      });
      // self.friends.on("fetch", function() {
      //   self.trigger("fetch_friends");
      //   iterate();
      // });

    }

  });



  return Facebook;


});