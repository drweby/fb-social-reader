define(function(require) {

  var Debugger = require('app/helpers/debugger');
  var Cookie   = require('app/helpers/cookie');
  var Cache    = require('app/models/cache');
  var _ = require('underscore');


	var Fb = {
		user: {},
		friends: [],
		activity: {}
	};

  Fb.init = function(site, cb) {
    var _this = this;
    var app_id = site.fb_app_id;
    var channel_url = site.fb_channel_url;
    var sdk_disabled = site.fb_sdk_disable;
    if (!app_id) {
      Debugger.log('Facebook app id not specified, STOP');
      return false;
    }
    Debugger.log('Initiliazing Facebook', 0);
    if (sdk_disabled == 'on') {
      Debugger.log('SDK loading disabled, wait for it to exist');
      this.sdk_check_count = 0;
      this.wait_for_fb(function() {
        Debugger.log('SDK loaded');
        cb();
      });
    } else {
      $('body').prepend('<div id="fb-root"></div>');
      Debugger.log('Prepended div fb-root to body');
      window.fbAsyncInit = function() {
        Debugger.log("Loading the SDK asynchronously with app id: " + app_id+ ', channel url: '+channel_url);
        FB.init({
          appId: app_id,
          channelUrl: channel_url,
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
    }
  };

  Fb.wait_for_fb = function (cb) {
    this.sdk_check_count++;
    if (this.sdk_check_count > 10) {
      Debugger.log('Facebook SDK loading: FAILURE');
      return;
    }
    var _this = this;
    if (window.FB) {
      Debugger.log(_this.sdk_check_count+': window.FB exists: SUCCESS');
       if ($('#fb-root').length === 1) {
        Debugger.log('<div id="fb-root"></div> exists: SUCCESS');
        cb();
      } else {
        Debugger.log(_this.sdk_check_count+': <div id="fb-root"></div> does not exist, try again in 100ms');
        setTimeout(function() {
          _this.wait_for_fb();
        }, 100);
      }
    } else {
      Debugger.log(_this.sdk_check_count+': window.FB does not exist, try again in 100ms');
      setTimeout(function() {
        _this.wait_for_fb();
      }, 100);
    }
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
    Debugger.log('Not in cache, querying Facebook');
    return FB.api('/me', function(me) {
      Debugger.log('Response received, setting values');
      me.picture = "//graph.facebook.com/" + me.id + "/picture";
      Debugger.log('Finished');
      return cb(me);
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
        _this.get_article(function(article) {
          if (!window._sr.activity.reads) {
            window._sr.activity.reads = [];
          }
          window._sr.activity.reads.unshift(article);
        });
      } else {
        Debugger.log("Read posted to Facebook: FAILURE - "+response.error.message);
      }
      Debugger.log('Finished');
    });
  };

  Fb.get_article = function(article_id, cb) {
    Debugger.log('Getting article '+article_id);
    return FB.api("/"+article_id, "get", function(response) {
      if (response.error) {
        Debugger('Failed to get article: '+response.error);
        cb(false);
      } else {
        cb(response);
      }
    });
  };

  Fb.delete_read = function(id, cb) {
    var _this = this;
    Debugger.log('Deleting user read', 0);
    return FB.api("/" + id, "delete", function(response) {
      Debugger.log('Response received from Facebook');
      if (response === true) {
        Debugger.log('Read deleted from Facebook: SUCCESS');
        _.each(window._sr.activity.reads, function(read, key) {
          if (read.id === id) {
            delete(reads[key]);
          }
        });
      } else {
        Debugger.log('Read deleted from Facebook: FAILURE');
        Debugger.log('Error message from Facebook: '+response.error.message);
      }
      return cb();
    });
  };

  Fb.get_friend_users = function(cb) {
    var _this = this;
    return FB.api('/me/friends?fields=id,name,installed', function(response) {
      Debugger.log('Response received, finding friend users');
      var friends_who_use_the_app = [];
      _.each(response.data, function(friend) {
        if (friend.installed === true) {
          delete friend.installed;
          friends_who_use_the_app.push(friend);
        }
      });
      Debugger.log(friends_who_use_the_app.length + " friends found");
      Debugger.log('Finished');
			cb(friends_who_use_the_app);
    });
  };

  Fb.get_activity = function(cb) {
    _this = this;
    var batch_arr = [];
    batch_arr.push({
      method: "GET",
      relative_url: "me/news.reads?fields=id,comment_info,comments,comment_info,likes,like_info,data,publish_time,from"
    });

    // Create batch array
    _.each(window._sr.friends, function(friend) {
      batch_arr.push({
        method: "GET",
        relative_url: friend.id + "/news.reads?fields=id,comment_info,comments,comment_info,likes,like_info,data,publish_time,from"
      });
    });
    Debugger.log("Starting batch requests for the " + window._sr.friends.length + " friends using this app");

    // Do request
    return FB.api("/", "POST", {
      batch: batch_arr
    }, function(responses) {
      Debugger.log('Response received from Facebook');

      // Build big array of reads
      var reads = [];
      // For each response (1 per friend)
      _.each(responses, function(response) {
        if (!response || !response.body) return;
        var body = JSON.parse(response.body);
        // For each friend read
        _.each(body.data, function(read) {
          reads.push(read);
        });
      });
      Debugger.log('Sorting the reads by publish_time descending');
      var sorted_reads = reads.sort(function(a, b) {
        a = new Date(a.publish_time);
        b = new Date(b.publish_time);
        return a>b ? -1 : a<b ? 1 : 0;
      });
      Debugger.log('Finished');

      var activity = {};
      activity.reads = sorted_reads;
      cb(activity);
    });

  };

  return Fb;


});