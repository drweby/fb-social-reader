define(["backbone",
        "underscore",
        "./global",
        "../modules/facebook/fb",
        "./helpers/sort"],
        function(Backbone, _, SR, Facebook, Sort) {


  var User = Backbone.Model.extend({

    initialize: function() {
      Facebook.set(SR.get('facebook'));
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
                SR.set({
                  user: user,
                  friends: friends,
                  activity: activity,
                  isReady: true
                });
                cb(true);
              });
            } else {
              SR.set('isReady', true);
              cb(true);
            }
          } else {
            SR.set('isReady', true);
            cb(false);
          }

        });
      });

    },

    // Queues read to Facebook. Returns true if queued, false if not.
    queue_read: function() {
      if (SR.get('auto_sharing') === true && SR.get('site').page_readable == "true") {
        setTimeout(function() {
          Facebook.add_read(function(read) {
            var activity = SR.get('activity');
            activity[0].data.unshift(read);
            SR.set('activity', activity);
            SR.trigger('change'); // force change to save cache
          });
        }, 2000);
        return true;
      } else {
        return false;
      }
    },

    put_all_reads_in_one_array: function(reads) {
      var new_reads = [];
      _.each(reads, function(read) {
        _.each(read.data, function(read) {
          new_reads.push(read);
        });
      });
      return Sort(new_reads, 'desc', 'publish_time');
    },

    login: function() {
      Facebook.login(function() {
        window.location.reload();
      });
    },

    logout: function(cb) {
      Facebook.logout(function() {
        cb();
      });
    },

    delete_read: function(read_id, cb) {
      Facebook.delete_read(read_id, function(response) {
        if (response === true) {
          var activity = SR.get('activity');
          _.each(activity[0].data, function(story, index) {
            if (story.id == read_id) {
              activity[0].data.splice(index);
            }
          });
          SR.set('activity', activity);
          SR.trigger('change');   // force change to save cache
          cb(true);
        } else {
          cb(false);
        }
      });
    }

  });

  return new User();

});
