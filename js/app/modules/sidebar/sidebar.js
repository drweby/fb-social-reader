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
      }).appendTo($sidebar);
      
    },

    toggle_auto_sharing: function(obj) {
      if (obj.attr("class").match(/sr_sidebar_toggled_on/)) {
        obj.removeClass("sr_sidebar_toggled_on");
        obj.addClass("sr_sidebar_toggled_off");
        User.set_auto_sharing(false);
      } else if (obj.attr("class").match(/sr_sidebar_toggled_off/)) {
        obj.removeClass("sr_sidebar_toggled_off");
        obj.addClass("sr_sidebar_toggled_on");
        User.set_auto_sharing(true);
      }
    }

  });



  return Sidebar;

});