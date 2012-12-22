define(['require', 'app/helpers/debugger'], function(require, Debugger) {

	var Single = {};

  Single.load = function(user, activity) {
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
    }
    //return this.model.fb_get_activity(function() {});
  };

  return Single;

});