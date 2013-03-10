define(["jquery",
        "underscore",
        "backbone"],
        function($, _, Backbone) {


  var FacebookModel = Backbone.Model.extend({

    start: function(cb) {
      var _this = this;

      if (!this.get('app_id')) return false;

      if (this.get('sdk_disabled') === true) {
        this.sdk_check_count = 0;
        this.wait_for_fb(function() {
          cb();
        });

      } else {

        if ($('#fb-root').length === 0) {
          $('body').prepend('<div id="fb-root"></div>');
        }

        window.fbAsyncInit = function() {
          FB.init({
            appId: _this.get('app_id'),
            channelUrl: _this.get('channel_url'),
            status: true,
            cookie: true,
            xfbml: true
          });
          cb();
        };
        (function(d, debug) {
          var id, js, ref;
          js = void 0;
          id = 'facebook-jssdk';
          ref = d.getElementsByTagName('script')[0];
          if (d.getElementById(id)) {
            return;
          }
          js = d.createElement('script');
          js.id = id;
          js.async = true;
          js.src = '//connect.facebook.net/en_US/all' + (debug ? '/debug' : '') + '.js';
          return ref.parentNode.insertBefore(js, ref);
        })(window.document, false);
      }
    },

    wait_for_fb: function (cb) {
      this.sdk_check_count++;
      if (this.sdk_check_count > 10) {
        return;
      }
      var _this = this;
      if (window.FB) {
         if ($('#fb-root').length === 1) {
          cb();
        } else {
          setTimeout(function() {
            _this.wait_for_fb();
          }, 100);
        }
      } else {
        setTimeout(function() {
          _this.wait_for_fb();
        }, 100);
      }
    },

    is_logged_in: function(cb) {
      FB.getLoginStatus(function(response) {
        cb((response.status === 'connected') ? true : false);
      });
    },

    get_data: function(cb) {
      var _this = this;
      _this.get_user(function() {
        _this.get_friends(function() {
          _this.get_activity(function() {
            cb(_this.get('user'), _this.get('friends'), _this.get('activity'));
          });
        });
      });
    },

    get_user: function(cb) {
      var _this = this;
      FB.api('/me', function(me) {
        me.picture = '//graph.facebook.com/' + me.id + '/picture';
        _this.set('user', me);
        cb();
      });
    },

    get_friends: function(cb) {
      var _this = this;
      FB.api('/me/friends?fields=id,name,installed', function(response) {
        _this.set('friends', response.data);
        cb();
      });
    },

    // Gets your friends who are actually using the app
    get_friends_appusers: function() {
      var appUsers = [];
      _.each(this.get('friends'), function(friend) {
        if (friend.installed === true) appUsers.push(friend);
      });
      return appUsers;
    },

    get_activity: function(cb) {
      var _this = this;

      var batch_arr = [];
      batch_arr.push({
        method: 'GET',
        user_id: this.get('user').id,
        relative_url: 'me/'+this.get('action_type')+'?fields=id,comment_info,comments,comment_info,likes,like_info,data,publish_time,from'
      });

      // Create batch array
      _.each(this.get_friends_appusers(), function(friend) {
        batch_arr.push({
          method: 'GET',
          user_id: friend.id,
          relative_url: friend.id + '/'+_this.get('action_type')+'?fields=id,comment_info,comments,comment_info,likes,like_info,data,publish_time,from'
        });
      });

      // Do request

      FB.api('/', 'POST', {
        batch: batch_arr
      }, function(responses) {
        var activity = [];
        _.each(responses, function(response, key) {
          if (!response || !response.body) return;
          var body = JSON.parse(response.body);
          activity.push(body);
        });
        _this.set('activity', activity);
        cb();
      });

    },

    login: function(cb) {
      var _this = this;
      FB.login((function(response) {
        if (response.status === 'connected') {
          cb();
        }
      }), {
        scope: 'publish_actions'
      });
    },

    logout: function(cb) {
      FB.logout(function(response) {
        cb();
      });
    },

    add_read: function(cb) {
      var _this = this;
      FB.api('/me/'+this.get('action_type')+'?article=' + window.location.href, 'post', function(response) {
        if (cb !== undefined) {
          if (response.id) {
            _this.get_read(response.id, function(read) {
              cb(response);
            });
          } else {
            cb(false);
          }
        }
      });
    },

    get_read: function(id, cb) {
      FB.api('/'+id, 'GET', function(response) {
        if (!response.error) {
          cb(response);
        } else {
          cb(false);
        }
      });
    },

    refresh_my_activity: function() {
      FB.api('me/'+this.get('action_type')+'?fields=id,comment_info,comments,comment_info,likes,like_info,data,publish_time,from', function(response) {
        window._sr.activity[0] = response;
      });
    },

    delete_read: function(id, cb) {
      FB.api('/' + id, 'delete', function(response) {
        cb(response);
      });
    }


  });

  var Facebook = new FacebookModel();
  return Facebook;

});