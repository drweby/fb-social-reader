define(function (require) {

  var User = require("app/models/user");
  // var Lightbox = require("app/controllers/lightbox");
  var SidebarTpl  = require("tpl!app/html/sidebar.html");

  var $ = window.jQuery;

  var Sidebar = Backbone.View.extend({

    ui: {
      sidebar: "#sr_sidebar_box"
    },

    initialize: function(options) {
      this.model = options.user;
      if ($(this.ui.sidebar).length === 0 || !this.model) {
        return;
      }
      this.render();
    },

    render: function() {
      var attributes = this.model.toJSON();
      var html = SidebarTpl(attributes);
      $(this.ui.sidebar).html(html).fadeIn();
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