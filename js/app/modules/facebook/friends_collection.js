define(function (require) {

  var Cache       = require("./cache");
  var FriendModel = require("./friend_model");


  var FriendsCollection = Backbone.Collection.extend({

    model: FriendModel,

    fetch: function() {
      var self = this;

      // TODO: CHECK CACHING
      var friends = Cache.get("friends");
      if (friends) {
        self.add(friends);
        self.trigger("fetch");
        return;
      }

      FB.api("/me/friends?fields=id,name,installed", function(response) {
        var friends = [];
        _.each(response.data, function(friend) {
          self.add(friend);
        });
        Cache.set({ "friends": self.toJSON() });
        self.trigger("fetch");
      });
    }


  });

  return FriendsCollection;

});