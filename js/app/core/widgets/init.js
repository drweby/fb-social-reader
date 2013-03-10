// Module that takes an array of widgets and runs them
define(["underscore",
        "./sidebar/sidebar",
        "./single/single"],
      function (_, Sidebar, Single) {


  var widgets = {
    'sidebar':  Sidebar,
    'single':   Single
    // 'lightbox': require('./lightbox/lightbox') // loaded in via sidebar
  };

  var Widgets = function(widget_array) {
    _.each(widget_array, function(key) {
      if (widgets[key] && _.isFunction(widgets[key])) {
        new widgets[key]();
      }
    });
  };

  return Widgets;

});