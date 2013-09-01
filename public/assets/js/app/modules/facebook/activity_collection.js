define(function (require) {

  var Cache         = require("./cache");
  var ActivityModel = require("./activity_model");

  var ActivityCollection = Backbone.Collection.extend({

    model: ActivityModel,

    initialize: function(models, options) {
      this.user = options.user;
      this.friends = options.friends;
      this.autoCache();
    },

    autoCache: function() { 
      var self = this;
      this.on("add", function() {
        Cache.set({ "activity": self.toJSON() });
      });
      this.on("remove", function() {
        Cache.set({ "activity": self.toJSON() });
      });
    },

    fetch: function() {

      self = this;

      // TODO: CHECK CACHING
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
        var flattenedData = self.flattenFbData();
        var orderedActivity = self.getOrderedActivity(flattenedData);
        self.add(orderedActivity);
        Cache.set({ "activity": self.toJSON() });
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

    getOrderedActivity: function(actions) {
      var sortedActions = actions.sort(function(a, b) {
        a = new Date(a.publish_time);
        b = new Date(b.publish_time);
        return a>b ? -1 : a<b ? 1 : 0;
      });
      return sortedActions;
    },

    addAction: function(type) {
      var self = this;
      FB.api("/me/"+type+"?article=" + window.location.href, "post", function(response) {
      // FB.api("/me/"+type+"?article=" + "http://socialreader-staging.eu01.aws.af.cm/2013/09/01/hello-world/", "post", function(response) {
        // self.trigger("add_action", response);
        // self.add()
        // var activity = self.getOrderedActivity();
      });
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