define(['require', 'app/helpers/debugger', 'app/helpers/cookie', 'app/models/cache'], function(require, Debugger, Cookie, Cache) {

	var Fb = {
		user: {},
		friends: [],
		activity: {}
	};

  Fb.init = function(app_id, cb) {

    var _this = this;
    Debugger.log('Initiliazing Facebook', 0);
    $('body').prepend('<div id="fb-root"></div>');
    Debugger.log('Prepended div fb-root to body');
    window.fbAsyncInit = function() {
      Debugger.log("Loading the SDK asynchronously with app id: " + app_id);
      FB.init({
        appId: app_id,
        channelUrl: "//localhost:8888/wordpress/channel.html",
        status: true,
        cookie: true,
        xfbml: true
      });
      Debugger.log('SDK loaded');
      Debugger.log('Finished');
      return cb();
    };
    return (function(d, debug) {
      var id, js, ref;
      js = void 0;
      id = "facebook-jssdk";
      ref = d.getElementsByTagName("script")[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement("script");
      js.id = id;
      js.async = true;
      js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
      return ref.parentNode.insertBefore(js, ref);
    })(window.document, false);
  };

	Fb.is_logged_in = function(cb) {
    var _this = this;
    Debugger.log('See if user is logged in to Facebook and the app', 0);
    Debugger.log('Query Facebook');
    return FB.getLoginStatus(function(response) {
      Debugger.log('Response from Facebook received');
      if (response.status === 'connected') {
        Debugger.log('User is logged in');
        _this.user.logged_in = true;
        Debugger.log('Finished');
        return cb(true);
      } else {
        Debugger.log('User is not logged in');
        _this.user.logged_in = false;
        Debugger.log('Finished');
        return cb(false);
      }
    });
  };

  Fb.get_user = function(cb) {
    var _this = this;
    Debugger.log('Get Facebook user', 0);
    Debugger.log('Querying Facebook');
    return FB.api('/me', function(me) {
      Debugger.log('Response received, setting values');
      _this.user.id = me.id;
      _this.user.name = me.name;
      _this.user.link = me.link;
      _this.user.picture = "//graph.facebook.com/" + me.id + "/picture";
      Debugger.log('Finished');
      return cb(_this.user);
    });
  };


  Fb.login = function(cb) {
    var _this = this;
    Debugger.log('Logging in the user to Facebook', 0);
    return FB.login((function(response) {
      Debugger.log('Response received from Facebook');
      if (response.status === 'connected') {
        Debugger.log('Logged in successfully');
        cb();
      } else {
        return Debugger.log("User cancelled login or did not fully authorize.");
      }
    }), {
      scope: "publish_actions"
    });
  };

  Fb.logout = function(cb) {
    var _this = this;
    Debugger.log('Logging the user out of Facebook', 0);
    return FB.logout(function(response) {
      Debugger.log('Logout successful');
      Debugger.log('Removing cached coookie NEED TO DO THIS');
      Debugger.log('Reloading the page');
      cb();
    });
  };

  Fb.add_read = function() {
    var _this = this;
    Debugger.log('Adding user read', 0);
    return FB.api("/me/news.reads?article=" + document.URL, "post", function(response) {
      Debugger.log('Response received from Facebook');
      if (response.id) {
        Debugger.log("Read " + response.id + " posted to Facebook: SUCCESS");
      } else {
        Debugger.log("Read posted to Facebook: FAILURE");
        Debugger.log("Error message from Facebook: " + response.error.message + " ");
      }
      Debugger.log('Finished');
    });
  };

  Fb.delete_read = function(id, cb) {
    var _this = this;
    Debugger.log('Deleting user read', 0);
    return FB.api("/" + id, "delete", function(response) {
      Debugger.log('Response received from Facebook');
      if (response === true) {
        Debugger.log('Read deleted from Facebook: SUCCESS');
      } else {
        Debugger.log('Read deleted from Facebook: FAILURE');
        Debugger.log('Error message from Facebook: #{response.error.message}');
      }
      return cb();
    });
  };

  Fb.get_friend_users = function(cb) {
    var _this = this;
    Debugger.log('Get Facebook friends using the app', 0);
    if (Cookie.exists('sr_friends_cache')) {
      Debugger.log('Friends in cache, get from server');
      Cache.get(_this.user.id, 'friends_cache', function(response) {
        _this.friends = response;
        if (cb !== null) cb(_this.friends);
      });
    } else {
      Debugger.log('Friends not in cache, querying Facebook');
      return FB.api('/me/friends?fields=name,installed', function(response) {
        var friend, _i, _len, _ref;
        Debugger.log('Response received, finding friend users');
        _ref = response.data;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          friend = _ref[_i];
          if (friend.installed === true) {
            delete friend.installed;
            _this.friends.push(friend);
          }
        }
        Debugger.log("" + _this.friends.length + " friends found");
        Debugger.log('Finished');
				Cache.save(_this.user.id, 'friends_cache', _this.friends, function() {
          cb(_this.friends);
        });
      });
    }
  };

  Fb.get_activity = function(cb) {
    var batch_arr, user, _i, _len, _ref,
    _this = this;
    Debugger.log('Getting activity of you and friends', 0);
    if (Cookie.exists('sr_activity_cache')) {
      Debugger.log('Activity in cache, get from server');
      Cache.get(_this.user.id, 'activity_cache', function(response) {
        _this.activity = response;
        if (cb !== null) cb(_this.activity);
      });
    } else {
      Debugger.log('Activity reads does not exist, create and fetch from Facebook');
      this.activity.reads = [];
      Debugger.log('Creating batch array');
      batch_arr = [];
      batch_arr.push({
        method: "GET",
        relative_url: "me/news.reads?fields=id,comment_info,comments,comment_info,likes,like_info,data,publish_time,from"
      });
      _ref = this.friends;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        user = _ref[_i];
        batch_arr.push({
          method: "GET",
          relative_url: "" + user.id + "/news.reads?fields=id,comment_info,comments,comment_info,likes,like_info,data,publish_time,from"
        });
      }
      Debugger.log("Starting batch requests for the " + this.friends.length + " friends using this app");
      return FB.api("/", "POST", {
        batch: batch_arr
      }, function(responses) {
        var body, read, response, _j, _k, _len1, _len2, _ref1;
        Debugger.log('Response received from Facebook');
        Debugger.log('Added reads to reads param array');
        for (_j = 0, _len1 = responses.length; _j < _len1; _j++) {
          response = responses[_j];
          if (!response || !response.body) continue;
          body = JSON.parse(response.body);
          _ref1 = body.data;
          for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
            read = _ref1[_k];
            _this.activity.reads.push(read);
          }
        }
        Debugger.log('Sorting the reads by publish_time descending');
        _this.activity.reads = _this.activity.reads.sort(function(a, b) {
          a = new Date(a.publish_time);
          b = new Date(b.publish_time);
          return a>b ? -1 : a<b ? 1 : 0;
        });
        Debugger.log('Finished');
        Cache.save(_this.user.id, 'activity_cache', _this.activity, function() {
          cb();
        });
      });
    }
  };

  return Fb;


});