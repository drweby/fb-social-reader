define(function (require) {

  var Global      = require("../global/global");
  var SidebarTpl  = require("tpl!./sidebar.html");
  var GenericCSS  = require("tpl!../../../../css/generic.css")();
  var SidebarCSS  = require("tpl!../../../../css/sidebar.css")({ pluginUrl: Global.get("pluginUrl") });

  var $ = window.jQuery;


  var Sidebar = Backbone.View.extend({

    ui: {
      sidebar: ".sr_sidebar_box"
    },

    initialize: function(options) {
      this.model = options.facebook;
      if ($(this.ui.sidebar).length === 0 || !this.model) {
        return;
      }
      this.render();
    },

    render: function() {
      var user = this.model.user.toJSON();
      var site = Global.toJSON();
      var attributes = _.extend(site, user);
      var html = SidebarTpl(attributes);

      var self = this;
      var $sidebar = $(this.ui.sidebar);
      $iframe = $("<iframe/>", {
        border: "0",
        css: {
          "border": "0px"
        }
      });
      $iframe.load(function() {
        $iframe.contents().find("head").append("<style type='text/css'>"+GenericCSS+"</style>");
        $iframe.contents().find("head").append("<style type='text/css'>"+SidebarCSS+"</style>");
        $iframe.contents().find("body").html(html);  
        $sidebar.fadeIn();   
        self.listen();
      }).appendTo($sidebar);
      
    },

    listen: function() {
      var self = this;
      $iframe = $(this.ui.sidebar).find("iframe").contents();

      // Activity 
      $iframe.find(".activity a").on("click", function() {
        self.trigger("activity_click");
      });

      // Auto sharing
      $iframe.find(".auto-sharing-toggle").on("click", function() {
        self.toggleAutoSharing($(this));
      });
    },

    toggleAutoSharing: function($toggle) {
      if ($toggle.hasClass("auto-sharing-toggled-on")) {
        $toggle.removeClass("auto-sharing-toggled-on").addClass("auto-sharing-toggled-off");
        this.model.user.set("autoSharing", false);
      } else {
        $toggle.removeClass("auto-sharing-toggled-off").addClass("auto-sharing-toggled-on");
        this.model.user.set("autoSharing", true);
      }
    }

  });



  return Sidebar;

});