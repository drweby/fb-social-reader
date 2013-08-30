define(function (require) {

  var Cache = require("./cache");


  var FriendsCollection = Backbone.Collection.extend({

    fetch: function() {
      var self = this;

      var friends = Cache.get("friends");
      if (friends) {
        self.trigger("fetch", friends);
        return;
      }

      FB.api("/me/friends?fields=id,name,installed", function(response) {
        var friends = [];
        _.each(response.data, function(friend) {
          if (friend.installed === true) {
            delete friend.installed;
            friends.push(friend);
          }
        });
        Cache.set("friends", friends);
        self.trigger("fetch", friends);
      });
    }


  });

  return FriendsCollection;

});