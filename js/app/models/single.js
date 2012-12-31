define([
  'require',
  'underscore',
  'app/helpers/debugger',
  'app/helpers/single-format',
  'app/models/analytics',
  'app/helpers/sample-data'
  ], function(
    require,
    _,
    Debugger,
    Format,
    Analytics,
    SampleData
  ) {

	var Single = {};

  Single.load = function(user, activity) {
    var _this = this;
    if (user.logged_in !== true) return;
    Debugger.log('Loading friends who read this widget', 0);
    if ($('#sr_friends_single').length === 0) {
      Debugger.log('#sr_friends_single not found, cannot load');
    } else {
      Debugger.log('#sr_friends_single found, start loading');
      var reads;
      if (SampleData.is_on()) {
        reads = SampleData.reads.data;
      } else {
        reads = activity.reads;
      }
      var single_reads = _.filter(reads, function(read) {
        var regex = new RegExp(window.location.pathname,"gi");
        if (!read.data || !read.data.article || !read.data.article.url) {
          return false;
        }
        if (regex.test(read.data.article.url)) {
          return true;
        }
      });
      Debugger.log('Creating the names list html string');
      var names_str = Format.names_list(user, single_reads);
      Debugger.log('Creating the thumbs list html string');
      var images_str = Format.thumbs_list(user, single_reads);
      var html = names_str + images_str;
      Debugger.log('Fading in');
      $('#sr_friends_single').html(html).fadeIn(function() {
        Analytics.setup_listeners('frs_single');
        Debugger.log('Finished');
      });
    }
  };

  return Single;

});