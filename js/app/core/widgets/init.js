// Module that takes an array of widgets and runs them
define(function (require) {

  var _       = require('underscore');

  var widgets = {
    'sidebar':  require('./sidebar/sidebar'),
    'single':   require('./single/single'),
    'lightbox': require('./lightbox/lightbox')
  };

  return function(widget_array) {
    _.each(widget_array, function(key) {
      if (widgets[key] && _.isFunction(widgets[key])) {
        new widgets[key]();
      }
    });
  };

});