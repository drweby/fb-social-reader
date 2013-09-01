define(function (require) {

  var MyReadsTpl  = require("tpl!./my_reads.html");
  var GenericCSS  = require("tpl!../../../../css/generic.css")();
  var MyReadsCSS  = require("tpl!../../../../css/my-reads.css")();


  var $ = window.jQuery;

  var MyReads = Backbone.View.extend({

    ui: {
      sidebarWrapper: ".sr-sidebar-box",
      sidebar: ".sr-sidebar-box .sr-sidebar"
    },

    initialize: function(options) {
      this.model = options.facebook;
    },

    render: function() {
      var self =this;
      

      self.$iframe = $("<iframe/>", {
        "class": "sr-my-reads",
        css: {
          "border": 0,
          "position": "absolute",
          "z-index": 99,
          "width": "340px",
          "height": "300px",
          "display": "none"
        }
      });

      self.$iframe.load(function() {
        self.$iframe.contents().find("head").append("<style type='text/css'>"+GenericCSS+"</style>");
        self.$iframe.contents().find("head").append("<style type='text/css'>"+MyReadsCSS+"</style>");
        self.$iframe.contents().find("body").html();
      });
      $(this.ui.sidebarWrapper).after(self.$iframe);

    },

    setFramePosition: function() {
      this.$iframe.css({
        "top": $(this.ui.sidebar).offset().top + 78 + "px",
        "left": $(this.ui.sidebar).offset().left - 148 + "px"
      });
    },

    setContent: function() {
      var userId = this.model.user.get("id");
      var activity = this.model.activity.getUserActivity(userId);
      var html = MyReadsTpl({ activity: activity });
      this.$iframe.contents().find("body").html(html);
    },

    show: function() {
      this.setFramePosition();
      this.setContent();
      this.$iframe.show();
    },

    hide: function() {
      this.$iframe.hide();
    }

  });

  return MyReads;

});