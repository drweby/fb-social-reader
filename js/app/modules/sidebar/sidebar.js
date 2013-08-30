define(function (require) {

  var Global      = require("../global/global");
  var SidebarTpl  = require("tpl!./sidebar.html");
  var $ = window.jQuery;


  var Sidebar = Backbone.View.extend({

    ui: {
      sidebar: "#sr_sidebar_box"
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