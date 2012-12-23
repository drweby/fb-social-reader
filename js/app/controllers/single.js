define([
  'require',
  'app/helpers/debugger',
  'app/helpers/single-format',
  'app/data/sample-reads'
  ], function(
    require,
    Debugger,
    Format,
    SampleReads
  ) {

	var Single = {};

  Single.load = function(user, activity) {

    // For local development
    //activity.reads = SampleReads.my_reads();

    var _this = this;
    Debugger.log('Loading friends who read this widget', 0);
    if ($('#sr_friends_single').length === 0) {
      Debugger.log('#sr_friends_single not found, cannot load');
    } else {
      Debugger.log('#sr_friends_single found, start loading');
      var i=0, ii=activity.reads.length, single_reads = [];
      for (; i<ii; i++) {
        var regex = new RegExp(window.location.pathname,"gi");
        if (regex.test(article_url)) {
          single_reads.push(activity.reads[i]);
        }
      }
      Debugger.log('Creating the names list html string');
      var names_str = Format.names_list(user, single_reads);
      Debugger.log('Creating the thumbs list html string');
      var images_str = Format.thumbs_list(user, single_reads);
      var html = names_str + images_str;
      Debugger.log('Fading in');
      $('#sr_friends_single').html(html).fadeIn(function() {
        Debugger.log('Finished');
      });
    }
  };







  return Single;

});