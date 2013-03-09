define(function (require) {

  var $                = require('jquery'),
      _                = require('underscore'),
      User             = require('../../user'),
      SR               = require('../../global'),
      Widget           = require('../widget'),
      RelativeTime     = require('./time');

  var CSS              = require('tpl!./style.css');
  var LightboxTpl      = require('tpl!./lightbox.html');
  var LightboxReadsTpl = require('tpl!./reads.html');


  var Lightbox = Widget.extend({

    initialize: function() {
      this.$container = $('body');
      if (this.$container.length === 0) return;
      this.create_iframe({ id: 'sr_lightbox', css: this.get_iframe_styles() });
      this.load_css(CSS);
      this.render();
    },

    get_iframe_styles: function() {
      return {
        'height':     '580px',
        'width':      '580px',
        'display':    'none',
        'position':   'fixed',
        'margin':     '0 0 0 -290px',
        'padding':    '10px',
        'top':        '75px',
        'left':       '50%',
        'right':      '0px',
        'bottom':     '0px',
        'z-index':    '99999'
      };
    },

    show: function(type, User) {
      var _this = this;
      this.$container.find('#sr_lightbox').fadeIn('fast', function() {
        _this.show_activity(type, User);
      });
    },

    events: {
      "click .close": "close",
      "click .tabs li a": "switch_tab",
      "click .story_delete": "delete_read"
    },

    close: function() {
      var _this = this;
      if (this.closing === true) return;
      this.closing = true;
      $('#sr_lightbox').fadeOut(function() {
        _this.$el.find('.inner').html('');
        delete _this.closing;
      });
    },

    show_activity: function() {

      // Get reads
      var reads = User.put_all_reads_in_one_array(SR.get('activity'));
      _.each(reads, function(read, key) {
        reads[key].relative_time = RelativeTime(reads[key].publish_time);
        if (read.from.id == SR.get('user').id) {
          reads[key].from_type = 'me';
        } else {
          reads[key].from_type = 'friend';
        }
      });
      var readsHtml = LightboxReadsTpl(_.extend(SR.attributes, { 'reads': reads }));

      // Set contents 
      var html = LightboxTpl(_.extend(SR.attributes, { contents: readsHtml }));
      this.$el.find('body').html(html);

    },

    switch_tab: function(e) {
      this.$el.find('.tabs li').removeClass('active');
      var $new_active = $(e.currentTarget).closest('li').addClass('active');
      if ($new_active.hasClass('me')) {
        this.$el.find("[data-from='friend']").hide();
      } else {
        this.$el.find("[data-from='friend']").show();
      }
    },

    delete_read: function(e) {
      $(e.currentTarget).text('Deleting...');
      var $story = $(e.currentTarget).closest('li');
      var read_id = $story.attr('data-id');
      User.delete_read(read_id, function(response) {
        if (response) {
          $story.fadeOut(function() {
            $story.remove();
          });
        }
      });
    }

  });


  return Lightbox;

});