define(['require', 'app/helpers/debugger'], function(require, Debugger) {

	var Single = {};

  Single.load = function() {
    var _this = this;
    Debugger.log('Loading friends who read this widget', 0);
    if ($('#sr_friends_single').length === 0) {
      Debugger.log('#sr_friends_single is not found, cannot load friends who read this widget.');
      return false;
    }
    return this.model.fb_get_activity(function() {});
  };


  return Single;

});