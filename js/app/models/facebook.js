define(function (require) {

  var Cache = require("./cache");

  var $ = jQuery;

  var Facebook = Backbone.Model.extend({

    defaults: {
      user: {},
      friends: [],
      activity: {}
    },

    initialize: function() {

      var self = this;

      if (!this.get("appId")) {
        return false;
      }

      if (this.get("sdkDisabled") === true) {
        this.sdk_check_count = 0;
        this.waitForFb(function() {
          cb();
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
      var _this = this;
      if (window.FB) {
         if ($("#fb-root").length === 1) {
          cb();
        } else {
          setTimeout(function() {
            _this.wait_for_fb();
          }, 100);
        }
      } else {
        setTimeout(function() {
          _this.wait_for_fb();
        }, 100);
      }
    },

    isLoggedIn: function() {
      var self = this;
      FB.getLoginStatus(function(response) {
        var loginStatus = (response.status === "connected") ? true : false;
        self.trigger("is_logged_in", loginStatus);
      });
    },

    getUser: function(cb) {
      var self = this;

      if (Cache.get("user")) {
        self.set("user", Cache.get("user"));
        self.trigger("fetch_user");
        return;
      } 

      FB.api("/me?fields=id,name", function(me) {
        me.picture = "//graph.facebook.com/" + me.id + "/picture";
        Cache.set("user", me);
        self.set("user", me);
        self.trigger("fetch_user");
      });
    },

    getFriends: function(cb) {
      var self = this;

      if (Cache.get("friends")) {
        self.set("friends", Cache.get("friends"));
        self.trigger("fetch_friends");
        return;
      }

      FB.api("/me/friends?fields=id,name,installed", function(response) {
        var friendUsers = [];
        _.each(response.data, function(friend) {
          if (friend.installed === true) {
            delete friend.installed;
            friendUsers.push(friend);
          }
        });
        Cache.set("friends", friendUsers);
        self.set("friends", friendUsers);
        self.trigger("fetch_friends");
      });
    },

    getActivity: function(cb) {
      self = this;

      if (Cache.get("activity")) {
        self.set("activity", Cache.get("activity"));
        self.trigger("fetch_activity");
        return;
      }

      var batch_arr = [];
      batch_arr.push({
        method: "GET",
        user_id: this.get("user").id,
        relative_url: "me/news.reads?fields=id,comment_info,comments,comment_info,likes,like_info,data,publish_time,from"
      });

      // Create batch array
      _.each(this.get("friends"), function(friend) {
        batch_arr.push({
          method: "GET",
          user_id: friend.id,
          relative_url: friend.id + "/news.reads?fields=id,comment_info,comments,comment_info,likes,like_info,data,publish_time,from"
        });
      });

      // Do request
      FB.api("/", "POST", {
        batch: batch_arr
      }, function(responses) {
        var activity = [];
        _.each(responses, function(response, key) {
          if (!response || !response.body) return;
          var body = JSON.parse(response.body);
          activity.push(body);
        });
        var orderedActivity = self.putAllReadsInOneArray(activity);
        Cache.set("activity", orderedActivity);
        self.set("activity", orderedActivity);
        self.trigger("fetch_activity");
      });

    },

    putAllReadsInOneArray: function(reads) {
      var new_reads = [];
      _.each(reads, function(read) {
        _.each(read.data, function(read) {
          new_reads.push(read);
        });
      });
      var sorted_reads = new_reads.sort(function(a, b) {
        a = new Date(a.publish_time);
        b = new Date(b.publish_time);
        return a>b ? -1 : a<b ? 1 : 0;
      });
      return sorted_reads;
    },

    login: function(cb) {
      FB.login((function(response) {
        if (response.status === "connected") {
          cb();
        }
      }), {
        scope: "publish_actions"
      });
    },

    logout: function(cb) {
      FB.logout(function(response) {
        cb();
      });
    },

    add_read: function() {
      var _this = this;
      FB.api("/me/news.reads?article=" + document.URL, "post", function(response) {
        if (response.id) {
          _this.refresh_my_activity();
        }
      });
    },

    refresh_my_activity: function() {
      FB.api(
        "me/news.reads?fields=id,comment_info,comments,comment_info,likes,like_info,data,publish_time,from", 
        function(response) {
          window._sr.activity[0] = response;
        }
      );
    },

    delete_read: function(id, cb) {
      var _this = this;
      FB.api("/" + id, "delete", function(response) {
        if (response === true) {
          _.each(window._sr.activity[0].data, function(read, key) {
            if (read.id == id) {
              delete(window._sr.activity[0].data[key]);
            }
          });
        }
        cb();
      });
    }

  });



  return Facebook;


});