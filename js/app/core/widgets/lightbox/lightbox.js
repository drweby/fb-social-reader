define(function (require) {

  var $                = require('jquery'),
      Time             = require('./time'),
      _                = require('underscore'),
      SR               = require('../../global'),
      Facebook         = require('app/modules/facebook/fb'),
      Widget           = require('../widget'),
      RelativeTime     = require('./time');


  var CSS              = require('tpl!./style.css');
  var LightboxTpl      = require('tpl!./lightbox.html');
  var LightboxReadsTpl = require('tpl!./read.html');


  return Widget.extend({

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
      "click .close": "close"
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
      var reads = Facebook.put_all_reads_in_one_array(SR.get('activity'));
      _.each(reads, function(read, key) {
        reads[key].relative_time = RelativeTime(reads[key].publish_time);
      });
      var readsHtml = LightboxReadsTpl(_.extend(SR.attributes, { 'reads': reads }));

      // Set contents 
      var html = LightboxTpl(_.extend(SR.attributes, { contents: readsHtml }));
      this.$el.find('body').html(html);



    },

    switch_tab: function() {

      //     $("#sr_activity_tabs a").on("click", function() {
      //       $('#sr_activity_tabs li').removeClass('sr_active_tab');
      //       $(this).closest('li').addClass('sr_active_tab');
      //       if ($(this).closest('li').attr('id') === 'sr_lightbox_everyone') {
      //         $('#sr_reads_list ul li').show();
      //       } else if ($(this).closest('li').attr('id') === 'sr_lightbox_me') {
      //         $('#sr_reads_list ul li.sr_friend_story').hide();
      //       }
    },

    delete_read: function() {

      //     });
      //     $('.sr_story_delete').on("click", function() {
      //       var read_id;
      //       read_id = $(this).closest('li').attr('id').replace('sr_read_', '');
      //       return Fb.delete_read(read_id, function(cb) {
      //         return $("#sr_read_"+read_id).fadeOut(function() {
      //           return $("#sr_read_"+read_id).remove();
      //         });
      //       });
      //     });
      //   }§
    }

  });




  return Lightbox;

});