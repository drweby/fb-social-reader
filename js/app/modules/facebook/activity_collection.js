define(function (require) {

  var Cache = require("./cache");

  var ActivityCollection = Backbone.Collection.extend({

    fetch: function() {

      self = this;

      var activity = Cache.get("activity");
      if (activity) {
        self.trigger("fetch", activity);
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
        self.trigger("fetch", orderedActivity);
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


    addRead: function() {
      var self = this;
      FB.api("/me/news.reads?article=" + window.location.href, "post", function(response) {
        var result = (response.id) ? response.id : false;
        self.trigger("add_read", result);
      });
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