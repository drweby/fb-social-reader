define(function(require) {

  var $            = require('jquery'),
      Widget       = require('../widget');
      User         = require('../../user'),
      Lightbox     = require('../lightbox/lightbox'),
      SR           = require('../../global');

  var LoggedInTpl  = require('tpl!./logged_in.tpl');
  var LoggedOutTpl = require('tpl!./logged_out.tpl');


  return Widget.extend({

    initialize: function() {
      if ($('#sr_sidebar_box').length === 0) {
        return false;
      }
      var html, toggled_class;
      if (SR.get('user')) {
        if (SR.get('auto_sharing') === true) {
          toggled_class = 'sr_sidebar_toggled_on';
        } else {
          toggled_class = 'sr_sidebar_toggled_off';
        }
        html = LoggedInTpl(SR.attributes);
        $('#sr_sidebar_box').html(html);
        if ($('#sr_sidebar_box').html() !== '') {
          $('#sr_sidebar_box').fadeIn(function() {
            _this.setup_logged_in_listeners();
          });
        }
      } else {
        html = LoggedOutTpl(SR.attributes);
        $('#sr_sidebar_box').html(logged_out_html);
        if ($('#sr_sidebar_box').html() !== '') {
          $('#sr_sidebar_box').fadeIn(function() {
            _this.setup_logged_out_listeners();
          });
        }

      }
    },

    setup_logged_in_listeners: function() {
      var _this = this;
      $("#sr_sidebar_box .sr_sidebar_toggle").on("click", function() {
        _this.toggle_auto_sharing($(this));
      });
      $("#sr_sidebar_box #sr_sidebar_activity").on("click", function() {
        Lightbox.show('all_activity', User);
      });
      $('#sr_sidebar_box #sr_sidebar_logout').on("click", function() {
        User.logout();
      });
    },

    setup_logged_out_listeners: function() {
      $('#sr_sidebar_box #sr_sidebar_login').on("click", function() {
        $(this).css('opacity', 0.7);
        User.login();
      });
    },

    toggle_auto_sharing: function(obj) {
      if (obj.attr('class').match(/sr_sidebar_toggled_on/)) {
        obj.removeClass('sr_sidebar_toggled_on');
        obj.addClass('sr_sidebar_toggled_off');
        SR.set('auto_sharing', false);
      } else if (obj.attr('class').match(/sr_sidebar_toggled_off/)) {
        obj.removeClass('sr_sidebar_toggled_off');
        obj.addClass('sr_sidebar_toggled_on');
        SR.set('auto_sharing', true);
      }
    }


  });



});