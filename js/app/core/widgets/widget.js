define(function (require) {

  var Backbone  = require('backbone'),
      _         = require('underscore'),
      $         = require('jquery');

  var GlobalCSS = require('tpl!./global.css');

  return Backbone.View.extend({

    load: function() {
      this.create_iframe();
      this.load_css(GlobalCSS);
    },

    create_iframe: function() {
      if (this.$container.html() === '') {
        var $iframe = $('<iframe />', {
          'border': 0
        });
        this.$container.html($iframe);
        this.setElement($iframe.contents());
      }
    },

    // Load a stylesheet to the iframe
    load_css: function(css) {
      var style = $('<style />', {
        type: 'text/css',
        html: css()
      });
      this.$el.find('head').append(style);
    }

  });

});