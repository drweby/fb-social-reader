define(function (require) {

  var Global        = require("../../global");
  var Cache         = require("./cache");
  var ActivityModel = require("./activity_model");

  var ActivityCollection = Backbone.Collection.extend({

    model: ActivityModel,

    initialize: function(models, options) {
      this.user = options.user;
      this.friends = options.friends;
      this.autoCache();
    },

    // Auto cache when articles are added/removed
    autoCache: function() { 
      var self = this;
      this.on("add", function() {
        self.saveCache();
      });
      this.on("remove", function() {
        self.saveCache();
      });
    },

    saveCache: function() {
      Cache.set({ "activity": this.toJSON() });
    },

    fetch: function() {

      self = this;

      var activity = Cache.get("activity");
      if (activity) {
        self.add(activity, { silent: true });
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
        var dataArr = [];
        _.each(responses, function(response, key) {
          if (!response || !response.body) return;
          var body = JSON.parse(response.body);
          dataArr.push(body);
        });
        var flattenedData = self.flattenFbData(dataArr);
        self.add(flattenedData, { silent: true });
        self.saveCache();
        self.trigger("fetch");
      });

    },

    flattenFbData: function(dataArr) {
      var flattened = [];
      _.each(dataArr, function(action) {
        _.each(action.data, function(actionData) {
          flattened.push(actionData);
        });
      });
      return flattened;
    },

    // Order by publish time descending
    comparator: function(action) {
      return - action.get("publish_time");
    },


    // Get friends who "did" something on a url, e.g. 
    // getFriendsWhoDid("news.reads", "article", window.location.pathname)
    getFriendsWhoDidThis: function(actionType, objectType, url) {

      // TODO: ADD CHECK FOR actionType
      var singleActions = this.filter(function(action) {
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

    getUserActivity: function(userId) {
      var activity = this.filter(function(action) {
        return (action.get("from").id === userId);
      });
      // because toJSON doesn't work here
      var jsonArr = [];
      _.each(activity, function (item) {
        jsonArr.push(item.toJSON());
      });     
      return jsonArr;
    },

    addRead: function() {
      var self = this;
      if (Global.get("isPost") === false) {
        return;
      }
      setTimeout(function() {
        self.addAction("news.reads");
      }, 10000);
    },

    addAction: function(type) {
      var self = this;
      FB.api(
        "/me/"+type+"?article=" + window.location.href,
        "post",
        function(response) {
          if (response.id) {
            FB.api(
              response.id + "?fields=id,comment_info,comments,comment_info,likes,like_info,data,publish_time,from",
              "get",
              function (response) {
                self.add(response);
              }
            );
          }
        }
      );
    },

    getActionDetails: function() {

    },

    deleteAction: function(id) {
      var self = this;
      FB.api("/" + id, "delete", function(response) {
        if (response === true) {
          self.remove(id);
        }
      });
    }

  });

  return ActivityCollection;

});