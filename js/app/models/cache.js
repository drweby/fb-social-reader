define(['require', 'app/helpers/debugger', 'app/helpers/cookie'], function(require, Debugger, Cookie) {

  var Cache = {};

  Cache.save = function(user_id, field, data, cb) {
    Debugger.log('Saving '+field+' to the database cache', 0);
    var _this = this;
    var json = JSON.stringify(data);
    return $.post(_sr_ajax.ajaxurl, {
      action: "_sr_ajax_hook",
      type: "save_cache",
      fb_id: user_id,
      field: field,
      data: json
    }, function(data) {
      Debugger.log('Ajax request complete');
      if (data == '1') {
        Debugger.log(field+' saved successfully');
        Cookie.set('sr_'+field, 'true', null);
        Debugger.log('Set cookie marking '+field+' as saved this session');
        Debugger.log('Finished');
        if (cb !== null) cb();
      } else {
        Debugger.log('Data failed to save:');
        console.log(data);
        Debugger.log('Finished');
        if (cb !== null) cb();
      }
    });
  };

  Cache.get = function(user_id, field, cb) {
    var _this = this;
    Debugger.log('Getting the '+field);
    return $.post(_sr_ajax.ajaxurl, {
      action: "_sr_ajax_hook",
      type: "get_cache",
      fb_id: user_id,
      field: field
    }, function(data) {
      Debugger.log('Ajax request complete');
      Debugger.log('Converting data to json object');
      try {
        var parsed = JSON.parse(data);
        Debugger.log('JSON parsed: SUCCESS');
        Debugger.log('Finished');
        if (cb !== null) cb(parsed);
      }
      catch(e) {
        Debugger.log('JSON parsed: FAILURE');
        Debugger.log('Finished');
        if (cb !== null) cb();
      }
    });
  };

  return Cache;

});