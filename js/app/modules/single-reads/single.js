define(function(require) {

  var Format = require("app/helpers/single-format");

  var SingleReads = Backbone.View.extend({

    ui: {
      single: ".sr_friends_single"
    },

    initialize: function() {
      this.model = options.facebook;
    },

    render: function() {
      if ($(this.ui.length).length === 0) {
        return;
      } else {
  
        var friendsWhoReadThis = this.model.activity.getFriendsWhoDidThis("news.reads", "article", window.location.pathname);

        var names_str = Format.names_list(user, friendsWhoReadThis);
        var images_str = Format.thumbs_list(user, friendsWhoReadThis);
        var html = names_str + images_str;
        $("#sr_friends_single").html(html).fadeIn();

      }
    }

  });

  return SingleReads;


});