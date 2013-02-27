define(function(require) {

  var $           = require('jquery');
  var Debugger    = require('app/helpers/debugger');
  var User        = require('app/models/user');
  var Lightbox    = require('app/controllers/lightbox');
  var Analytics   = require('app/models/analytics');
  var _           = require('underscore');

  var SidebarHtmlLoggedIn = require('text!app/html/sidebar-logged-in.html');
  var SidebarHtmlLoggedOut = require('text!app/html/sidebar-logged-out.html');


	var Sidebar = {};

  Sidebar.load = function() {
    var toggled_class, _this = this, user = window._sr.user, site = window._sr.site;
    if ($('#sr_sidebar_box').length === 0) {
      Debugger.log('#sr_sidebar_box is not found, cannot load sidebar.');
      return false;
    }
    Debugger.log("Loading the sidebar", 0);
    if (user) {
      if (user.is_auto_sharing === true) {
        toggled_class = 'sr_sidebar_toggled_on';
      } else {
        toggled_class = 'sr_sidebar_toggled_off';
      }
      Debugger.log("User auto-sharing is set to: " + user.is_auto_sharing);
      Debugger.log('Putting html');
      var logged_in_template = _.template(SidebarHtmlLoggedIn);
      var html = logged_in_template(window._sr);
      $('#sr_sidebar_box').html(html);
      if ($('#sr_sidebar_box').html() !== '') {
        Debugger.log("Html put: SUCCESS");
        $('#sr_sidebar_box').fadeIn(function() {
          _this.setup_logged_in_listeners();
          Analytics.setup_listeners('sidebar_logged_in');
          Debugger.log('Finished');
        });
      } else {
        Debugger.log("Html put: FAILURE");
      }
    } else {
      Debugger.log('User is not logged in, show login button');
      Debugger.log('Putting html');
      var logged_out_template = _.template(SidebarHtmlLoggedOut);
      var logged_out_html = logged_out_template(window._sr);
      $('#sr_sidebar_box').html(logged_out_html);
      if ($('#sr_sidebar_box').html() !== '') {
        Debugger.log("Html put: SUCCESS");
        $('#sr_sidebar_box').fadeIn(function() {
          Debugger.log('Adding jQuery listener for login button click');
          _this.setup_logged_out_listeners();
          Analytics.setup_listeners('sidebar_logged_out');
          Debugger.log('Finished');
        });
      } else {
        Debugger.log("Html put: FAILURE");
      }
     
    }
  };

  Sidebar.setup_logged_in_listeners = function() {
    var _this = this;
    Debugger.log("Setup jQuery listener for toggle auto-sharing link click");
    $("#sr_sidebar_box .sr_sidebar_toggle").on("click", function() {
      _this.toggle_auto_sharing($(this));
    });
    Debugger.log("Setup jQuery listener activity link click");
    $("#sr_sidebar_box #sr_sidebar_activity").on("click", function() {
      Lightbox.show('all_activity', User);
    });
    Debugger.log('Setup jQuery listener for logout link click');
    $('#sr_sidebar_box #sr_sidebar_logout').on("click", function() {
      User.logout();
    });
  };

  Sidebar.setup_logged_out_listeners = function() {
    $('#sr_sidebar_box #sr_sidebar_login').on("click", function() {
      $(this).css('opacity', 0.7);
      User.login();
    });
  };

  Sidebar.toggle_auto_sharing = function(obj) {
    if (obj.attr('class').match(/sr_sidebar_toggled_on/)) {
      obj.removeClass('sr_sidebar_toggled_on');
      obj.addClass('sr_sidebar_toggled_off');
      User.set_auto_sharing(false);
    } else if (obj.attr('class').match(/sr_sidebar_toggled_off/)) {
      obj.removeClass('sr_sidebar_toggled_off');
      obj.addClass('sr_sidebar_toggled_on');
      User.set_auto_sharing(true);
    }
  };

  return Sidebar;

});