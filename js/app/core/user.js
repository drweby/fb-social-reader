define(function(require) {

  var Backbone  = require('backbone');

  var SR        = require('./global'),
      Facebook  = require('../modules/facebook/fb');


  return Backbone.Model.extend({

    initialize: function() {
      // Pass attributes to the Facebook object
      var page = SR.get('options');
      Facebook.set({
        app_id: page.fb_app_id,
        sdk_disabled: page.fb_sdk_disabled,
        channel_url: page.fb_channel_url
      });
    },

    start: function(cb) {
      var _this = this;

      // Load the API, then get FB data
      Facebook.start(function() {
        Facebook.is_logged_in(function(bool) {

          // Get the user, friends, and activity from Facebook, if cache hasn't been updated for a while
          if (SR.get('is_cached_recently') === false) {
            Facebook.get_data(function(user, friends, activity) {
              SR.set({
                user: user,
                friends: friends,
                activity: activity
              });
              cb();
            });
          } else {
            cb();
          }

        });

      });

    },

    // Queues read to Facebook. Returns true if queued, false if not.
    // queue_read: function(cb) {
    //   var do_read = SR.get('user').is_auto_sharing === true && SR.get('page').is_readable === true;
    //   if (do_read) {
    //     setTimeout(function() {
    //       Facebook.add_read();
    //     }, 10000);
    //   }
    //   return do_read;
    // },

    // Use the global directly in the view
    // set_auto_sharing: function(bool) {
    //   SR.set('auto_sharing', bool);
    // },

    login: function() {
      Facebook.login(function() {
        window.location.reload();
      });
    },

    logout: function() {
      Facebook.logout(function() {
        Cache.clear_all();
        window.location.reload();
      });
    }




  });


});
