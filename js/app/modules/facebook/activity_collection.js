define(function (require) {

  var Cache         = require("./cache");
  var ActivityModel = require("./activity_model");

  var ActivityCollection = Backbone.Collection.extend({

    model: ActivityModel,

    initialize: function(models, options) {
      this.user = options.user;
      this.friends = options.friends;
    },

    fetch: function() {

      self = this;

      // TODO: CHECK CACHING
      var activity = Cache.get("activity");
      if (activity) {
        self.add(activity);
        self.trigger("fetch");
        return;
      }

      var batch_arr = [];
      batch_arr.push({
        method: "GET",
        user_id: this.user.get("id"),
        relative_url: "me/news.reads?fields=id,comment_info,comments,comment_info,likes,like_info,data,publish_time,from"
      });

      // Create batch array
      this.friends.each(function(friend) {
        if (!friend.get("installed")) return;
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
        _.each(responses, function(response, key) {
          if (!response || !response.body) return;
          var body = JSON.parse(response.body);
          self.add(body);
        });
        Cache.set({ "activity": self.toJSON() });
        self.trigger("fetch");
      });

    },


    getOrderedActivity: function() {
      var newActions = [];
      this.each(function(action) {
        _.each(action.get("data"), function(actionData) {
          newActions.push(actionData);
        });
      });
      var sortedActions = newActions.sort(function(a, b) {
        a = new Date(a.publish_time);
        b = new Date(b.publish_time);
        return a>b ? -1 : a<b ? 1 : 0;
      });
      return sortedActions;
    },


    addAction: function(type) {
      var self = this;
      FB.api("/me/"+type+"?article=" + window.location.href, "post", function(response) {
        self.trigger("add_action", response);
      });
    },

    // Get friends who "did" something on a url, e.g. 
    // getFriendsWhoDid("news.reads", "article", window.location.pathname)
    getFriendsWhoDidThis: function(actionType, objectType, url) {
      var allActions = this.getOrderedActivity();

      // TODO: ADD CHECK FOR actionType
      var singleActions = _.filter(allActions, function(action) {
        var regex = new RegExp(window.location.pathname,"gi");
        if (!action.data || !action.data[objectType] || !action.data[objectType].url) {
          return false;
        }
        if (regex.test(action.data[objectType].url)) {
          return true;
        }
      });

      return singleActions;
    },

    refreshMyActivity: function() {
      FB.api(
        "me/news.reads?fields=id,comment_info,comments,comment_info,likes,like_info,data,publish_time,from", 
        function(response) {

          // var currentActivity = 

        }
      );
    },

    deleteRead: function(id, cb) {
      var self = this;
      FB.api("/" + id, "delete", function(response) {
        if (response === true) {
          _.each(window._sr.activity[0].data, function(read, key) {
            if (read.id == id) {

            }
          });
        }
        cb();
      });
    }

  });

  return ActivityCollection;

});