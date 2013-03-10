define(["jquery",
        "underscore",
        "../template",
        "./format"],
        function($, _, Template, Format) {

  var Single = Widget.extend({

    initialize: function() {
      var user = window._sr.user, activity = window._sr.activity;
      if (!user) return;
      if ($('#sr_friends_single').length === 0) {
      } else {
        if (!activity) {
          return;
        }
        var reads = Fb.put_all_reads_in_one_array();
        var single_reads = _.filter(reads, function(read) {
          var regex = new RegExp(window.location.pathname,"gi");
          if (!read.data || !read.data.article || !read.data.article.url) {
            return false;
          }
          if (regex.test(read.data.article.url)) {
            return true;
          }
        });
        var names_str = Format.names_list(user, single_reads);
        var images_str = Format.thumbs_list(user, single_reads);
        var html = names_str + images_str;
      }
    }

  });

  return Single;

});