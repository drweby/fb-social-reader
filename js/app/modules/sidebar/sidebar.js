define(function (require) {

  var Global      = require("../../global");
  var SidebarTpl  = require("tpl!./sidebar.html");
  var GenericCSS  = require("tpl!../../../../css/generic.css")();
  var SidebarCSS  = require("tpl!../../../../css/sidebar.css")({ pluginUrl: Global.get("pluginUrl") });

  var $ = window.jQuery;


  var Sidebar = Backbone.View.extend({

    ui: {
      sidebar: ".sr_sidebar_box",
      activityLink: ".activity a",
      autoSharingToggle: ".auto-sharing-toggle",
      logout: ".logout"
    },

    initialize: function(options) {
      this.model = options.facebook;
    },

    render: function() {
      if ($(this.ui.sidebar).length === 0 || !this.model) {
        return;
      }

      var user = this.model.user.toJSON();
      var site = Global.toJSON();
      var html = SidebarTpl(_.extend(site, user));

      var self = this;
      var $sidebar = $(this.ui.sidebar);
      $iframe = $("<iframe/>", {
        css: {
          "border": 0
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
      $iframe.find(this.ui.activityLink).on("click", function() {
        self.trigger("show_activity");
      });

      // Auto sharing
      $iframe.find(this.ui.autoSharingToggle).on("click", function() {
        self.toggleAutoSharing($(this));
      });

      // Logout
      $iframe.find(this.ui.logout).on("click", function() {
        self.model.user.on("logout", function() {
          window.location.reload();
        }).logout();
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