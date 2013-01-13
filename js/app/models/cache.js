define(function(require) {

  var Debugger  = require('app/helpers/debugger');
  var Cookie    = require('app/helpers/cookie');
  var $         = require('jquery');


  var Cache = {};

  Cache.save = function(user_id, field, data, cb) {
    Debugger.log('Saving '+field+' to the cache');
    var _this = this;
    return $.post(_sr_ajax.ajaxurl, {
      action: "_sr_ajax_hook",
      type: "save_cache",
      fb_id: user_id,
      field: field,
      data: data
    }, function(data) {
      if (data != '0') {
        Debugger.log(field+' saved successfully');
        Cookie.set('sr_'+field+'d', 'true', null);
        Debugger.log('Finished');
        if (cb !== undefined) cb();
      } else {
        Debugger.log('Data failed to save:');
        Debugger.log('Finished');
        if (cb !== undefined) cb();
      }
    });
  };

  // We make our own custom method for saving the user because we need to deal with auto sharing in the user object.
  // Other saving just uses the Cache model.
  Cache.save_user = function(user, cb) {
    var _this = this;
    Debugger.log('Saving user', 0);
    return $.post(_sr_ajax.ajaxurl, {
      action: "_sr_ajax_hook",
      type: "save_user",
      user: user
    }, function(data) {
      try {
        var obj = JSON.parse(data);
        if (obj) {
          Cookie.set('sr_user_id', user.id, null);
          Cookie.set('sr_user_cached', 'true', null);
          Debugger.log('user_cache saved successfully');
          Debugger.log('Finished');
        }
        window._sr.user = obj;
        cb();
      } catch(e) {
        Debugger.log('Failed to parse JSON');
        console.log(data);
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

  // Ensures all window cached variables are gone, and all cookies referencing to the cache are gone.
  Cache.clear_all = function() {
    delete window._sr.user;
    delete window._sr.activity;
    delete window._sr.friends;
    Cookie.remove('sr_user_id');
    Cookie.remove('sr_user_cached');
    Cookie.remove('sr_activity_cached');
    Cookie.remove('sr_friends_cached');
  };

  Cache.refresh = function() {
    Debugger.log('Refreshing cache by deleting cookies', 0);
    Cookie.remove('sr_activity_cache');
    Cookie.remove('sr_friends_cache');
  };

  return Cache;
  

});