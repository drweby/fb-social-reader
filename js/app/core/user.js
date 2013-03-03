define(function(require) {

  var Backbone  = require('backbone');

  var SR        = require('./global'),
      Facebook  = require('../modules/facebook/fb');


  var User = Backbone.Model.extend({

    initialize: function() {
      Facebook.set(SR.get('options').facebook);
    },

    start: function(cb) {
      var _this = this;

      // Load the API, then get FB data
      Facebook.start(function() {
        Facebook.is_logged_in(function(is_logged_in) {

          if (is_logged_in) {
            // Get the user, friends, and activity from Facebook, if cache hasn't been updated for a while
            if (SR.get('is_cached_recently') === false) {
              Facebook.get_data(function(user, friends, activity) {
                SR.set({ user: user, friends: friends, activity: activity });
                cb();
              });
            } else {
              cb();
            }
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

    login: function() {
      Facebook.login(function() {
        window.location.reload();
      });
    },

    logout: function(cb) {
      Facebook.logout(function() {
        cb();
      });
    }

  });

  return new User();

});
