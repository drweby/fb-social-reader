define(function(require) {

  var Format         = require("./format");
  var GenericCSS     = require("tpl!../../../../css/generic.css")();
  var SingleReadsCSS = require("tpl!../../../../css/single-reads.css")();
  var $              = window.jQuery;


  var SingleReads = Backbone.View.extend({

    ui: {
      single: ".sr-single-reads"
    },

    initialize: function(options) {
      this.model = options.facebook;
    },

    getHtml: function() {
      var friendsWhoReadThis = this.model.activity.getFriendsWhoDidThis("news.reads", "article", window.location.pathname);
      var format = new Format({ userId: this.model.user.get("id") });
      var names_str = format.nameList(friendsWhoReadThis);
      var images_str = format.thumbList(friendsWhoReadThis);
      return (names_str + images_str);
    },

    render: function() {
      var self = this;

      if ($(this.ui.single).length === 0) {
        return;
      } else {

        $iframe = $("<iframe/>", {
          css: {
            "border": 0
          }
        });

        $iframe.load(function() {
          $iframe.contents().find("head").append("<style type='text/css'>"+GenericCSS+"</style>");
          $iframe.contents().find("head").append("<style type='text/css'>"+SingleReadsCSS+"</style>");
          $iframe.contents().find("body").html(self.getHtml());  
          $(self.ui.single).fadeIn();   
        }).appendTo($(self.ui.single));

      }
    }

  });

  return SingleReads;


});