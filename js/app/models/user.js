define(['require', 'app/models/fb', 'app/helpers/cookie', 'app/helpers/debugger'], function(require, Fb, Cookie, Debugger) {

  var $ = jQuery;

  var User = {};

  User.init = function(cb1, cb2) {
    var _this = this;
    this.site = {};
    this.user = {};
    this.friends = [];
    this.activity = {};

    this.get_client_details(function() {
      Fb.init(_this.site.fb_app_id, function() {
        Fb.is_logged_in(function(bool) {
          if (bool === true) {
            Fb.get_user(function(user) {
              _this.user = user;
              _this.user.logged_in = bool;
              _this.is_auto_sharing(function() {
                cb1();
                Fb.get_friend_users(function(friends) {
                  _this.friends = friends;
                  Fb.get_activity(function(activity) {
                    _this.activity = activity;
                    cb2();
                  });
                });
              });
            });
          } else {
            return cb1();
          }
        });
      });
    });
  };

  User.get_client_details = function(cb) {
    var _this = this;
    Debugger.log('Getting client site details', 0);
    return $.post(_sr_ajax.ajaxurl, {
      action: "_sr_ajax_hook",
      type: "get_client_details"
    }, function(data) {
      Debugger.log('Ajax request complete');
      _this.site = JSON.parse(data);
      if (_this.site) {
        Debugger.log('Read from ajax request data: SUCCESS');
      } else {
        Debugger.log('Read from ajax request data: FAILURE');
      }
      Debugger.log('Finished');
      return cb();
    });
  };


  User.is_auto_sharing = function(cb) {
    var _this = this;
    Debugger.log("See if we're auto sharing");
    return $.post(_sr_ajax.ajaxurl, {
      action: "_sr_ajax_hook",
      type: "is_auto_sharing",
      fb_id: this.user.id
    }, function(data) {
      Debugger.log('Ajax request complete');
      if (data == 1 || data == 0) {
        Debugger.log('SUCCESS, set param');
        if (data == 1) {
          data = true;
        } else {
          data = false;
        }
        _this.user.auto_sharing = data;
        Debugger.log('Finished');
      } else {
        Debugger.log('Data format is incorrect. FAILURE');
        console.log(data);
      }
      return cb();
    });
  };

  User.set_auto_sharing = function(bool) {
    var _this = this;
    Debugger.log('Setting auto sharing', 0);
    Debugger.log("Changing auto sharing to " + bool);
    return $.post(_sr_ajax.ajaxurl, {
      action: "_sr_ajax_hook",
      type: "set_auto_sharing",
      fb_id: this.user.id,
      is_auto_sharing: bool
    }, function(data) {
      Debugger.log('Ajax request complete');
      if (data == 1) {
        Debugger.log('Auto sharing change: SUCCESS');
      } else {
        Debugger.log('Auto sharing change: FAILURE');
      }
      Debugger.log('Finished');
    });
  };

  User.login = function() {
    Fb.login(function() {
      window.location.reload();
    });
  };

  User.logout = function() {
    Fb.logout(function() {
      Cookie.remove('sr_activity_cache');
      Cookie.remove('sr_friends_cache');
      window.location.reload();
    });
  };



  return User;



});
