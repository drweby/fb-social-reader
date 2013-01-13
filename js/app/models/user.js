define(function(require) {

  var Fb        = require('app/models/fb');
  var Cookie    = require('app/helpers/cookie');
  var Debugger  = require('app/helpers/debugger');
  var Cache     = require('app/models/cache');
  var $         = require('jquery');


  var User = {};

  User.init = function(cb1, cb2) {

    // window._sr should be populated already
    var _sr = window._sr;
    var _this = this;

    Fb.init(_sr.site,  function() {
      Fb.is_logged_in(function(is_logged_in) {
        if (is_logged_in === true) {
          _this.get_user(function() {
            _this.queue_read();
            cb1();
            _this.get_friends(function() {
              _this.get_activity(function() {
                cb2();
              });
            });
          });
        } else {
          Cache.clear_all();
          cb1();
        }
      });
    });
  
  };

  User.get_user = function(cb) {
    var _this = this;
    Debugger.log('Getting user', 0);

    // If user already exists in cache for this session
    if (window._sr && window._sr.user) {
      Debugger.log('Already in cache, get from the window._sr.user variable');
      Debugger.log('Finished');
      return cb();
    }

    // Get user from Facebook and ave the cache, updating auto sharing back end
    Fb.get_user(function(user) {
      Cache.save_user(user, function() {
        cb();
      });
    });

  };

  User.get_friends = function(cb) {
    Debugger.log('Getting friends', 0);
    // If friends already exists in cache for this session
    if (window._sr && window._sr.friends !== undefined) {
      Debugger.log('Already in cache, get from the window._sr.friends variable');
      Debugger.log('Finished');
      return cb();
    }
    // Get friends from Facebook and save to cache
    Fb.get_friend_users(function(friends) {
      window._sr.friends = friends;
      cb();
    });
  };

  User.get_activity = function(cb) {
    Debugger.log('Getting you and your and friends activity', 0);
    // If activity already exists in cache for this session
    if (window._sr && window._sr.activity !== undefined) {
      Debugger.log('Already in cache, get from the window._sr.activity variable');
      Debugger.log('Finished');
      return cb();
    }
    // Get activity from Facebook and save to cache
    Fb.get_activity(function(activity) {
      window._sr.activity = activity;
      cb();
    });
  };

  // Queues read to Facebook. Returns true if queued, false if not.
  User.queue_read = function(cb) {
    Debugger.log('Queuing auto-read to Facebook', 0);
    if (window._sr.user.is_auto_sharing === true && window._sr.page.is_readable === true) {
      Debugger.log('Auto-sharing on, page is readable, queue the read');
      setTimeout(function() {
        Fb.add_read();
      }, 10000);
      Debugger.log('Finished');
      return true;
    } else {
      Debugger.log('Either auto-sharing is off or this page is not readable');
      Debugger.log('Finished');
      return false;
    }
  };

  User.set_auto_sharing = function(bool) {
    var _this = this;
    Debugger.log('Setting auto sharing', 0);
    Debugger.log("Changing auto sharing to " + bool);
    window._sr.user.is_auto_sharing = bool;
    var user = window._sr.user;
    Cache.save(user.id, 'user_cache', user);
  };

  User.login = function() {
    Fb.login(function() {
      window.location.reload();
    });
  };

  User.logout = function() {
    Fb.logout(function() {
      Cache.clear_all();
      window.location.reload();
    });
  };



  return User;



});
