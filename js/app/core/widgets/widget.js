define(function (require) {

  var Backbone  = require('backbone'),
      _         = require('underscore'),
      $         = require('jquery');

      SR        = require('../global');

  var GlobalCSS = require('tpl!./global.css');

  return Backbone.View.extend({

    create_iframe: function(css) {
      var parameters = { 'border': 0 };
      if (css !== undefined) parameters = _.extend(parameters, css);
      var $iframe = $('<iframe />', parameters);
      this.$container.prepend($iframe);
      this.setElement($iframe.contents());
      this.load_css(GlobalCSS);
    },

    // Load a stylesheet to the iframe
    load_css: function(css) {
      var style = $('<style />', {
        type: 'text/css',
        html: css(SR.site)
      });
      this.$el.find('head').append(style);
    }

  });

});