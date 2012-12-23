define([
    'require',
    'app/helpers/debugger',
    'app/models/user',
    'app/controllers/lightbox',
    'app/models/analytics'
    ], function(
      require,
      Debugger,
      User,
      Lightbox,
      Analytics
    ) {

	var Sidebar = {};

  Sidebar.load = function(user, site) {
    var toggled_class,
    _this = this;
    if ($('#sr_sidebar_box').length === 0) {
      Debugger.log('#sr_sidebar_box is not found, cannot load sidebar.');
      return false;
    }
    Debugger.log("Loading the sidebar", 0);
    if (user.logged_in === true) {
      Debugger.log("User is logged in");
      if (user.auto_sharing === true) {
        toggled_class = 'sr_sidebar_toggled_on';
      } else {
        toggled_class = 'sr_sidebar_toggled_off';
      }
      Debugger.log("User auto-sharing is set to: " + user.auto_sharing);
      Debugger.log('Putting html');
      $('#sr_sidebar_box').html("       <div id='sr_sidebar_logged_in'>               <a id='sr_sidebar_img' target='blank' href='" + user.link + "'>            <img src='" + user.picture + "' width='50' height='50' alt='" + user.name + "' />         </a>          <div id='sr_sidebar_right'>           <div id='sr_sidebar_name'><a target='blank' href='" + user.link + "'>" + user.name + "</a></div>            <div id='sr_sidebar_promo'>" + site.login_meta + "</div>           <div id='sr_sidebar_logout'><a>Logout</a></div>         </div>          <div class='clear'></div>         <div id='sr_sidebar_bottom'>            <div class='sr_sidebar_toggle " + toggled_class + "'>             <a title='Auto sharing to Facebook is enabled'>" + site.auto_sharing_on + "</a>            </div>            <div id='sr_sidebar_activity'><a>" + site.activity + "</a></div>         </div>        </div>      ");
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
      $('#sr_sidebar_box').html("       <div id='sr_sidebar_logged_out'>                <p>Login and read with your friends</p>          <a id='sr_sidebar_login'><img src='" + site.plugin_url + "/images/facebooklogin.jpg' width='180' height='40' /></a>        </div>      ");
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