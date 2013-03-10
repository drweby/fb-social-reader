define(["jquery",
        "underscore",
        "backbone",
        "../../user",
        "../lightbox/lightbox",
        "../../global"],
        function($, _, Backbone, User, Lightbox, SR) {




  var Sidebar = Backbone.View.extend({

    initialize: function() {
      var _this = this;

      // Work out file to use and set parameters
      if (_.isEmpty(SR.get('user'))) {
        filePath = 'sidebar-logged-out.html';
      } else {
        filePath = 'sidebar-logged-in.html';
      }

      // Build options
      var templateOptions = {
        el: '#sr_sidebar_box',
        file: filePath,
        iframe: true
      };
      templateOptions = _.extend(templateOptions, SR.attributes);

      // Get and put the template
      SR.template(templateOptions, function() {
        _this.listen_for_events();
      });

      // this.$container = $('#sr_sidebar_box');
      // if (this.$container.length === 0) return;
      // this.create_iframe( { id: 'sr_sidebar' });
      // // this.load_css(CSS);
      // this.render();
      // this.lightbox = new Lightbox();
    },

    listen_for_events: function() {
      debugger;
      var $el = $('#sr_sidebar_box').find('iframe').contents().find('html');
      $el.find('a').on('click', function() {
        alert('clicked');
      });
    },

    // render: function() {
    //   var html;
    //   if (!_.isEmpty(SR.get('user'))) {
    //     var toggled_class = (SR.get('auto_sharing') === true) ? 'auto_sharing_on' : 'auto_sharing_off';
    //     html = LoggedInTpl(SR.attributes);
    //     this.$el.find('body').html(html);
    //   } else {
    //     debugger;
    //     html = LoggedOutTpl(SR.attributes);
    //     this.$el.find('body').html(html);
    //   }
    // },

    // events: {
    //   "click .toggle": "toggle_auto_sharing",
    //   "click .activity": "show_lightbox",
    //   "click .logout": "logout",
    //   "click .login": "login"
    // },

    login: function(e) {
      $button = $(e.currentTarget);
      $button.css('opacity', 0.7);
      User.login();
    },

    toggle_auto_sharing: function(e) {
      var $toggle = $(e.currentTarget);
      var turn_auto_sharing = ($toggle.hasClass('toggled_on')) ? false : ($toggle.hasClass('toggled_off')) ? true : false;
      var auto_sharing_text = (turn_auto_sharing === true) ? SR.get('sidebar').auto_sharing_on : SR.get('sidebar').auto_sharing_off;
      $toggle.toggleClass('toggled_on toggled_off');
      $toggle.find('a').text(auto_sharing_text);
      SR.set('auto_sharing', turn_auto_sharing);
    },

    show_lightbox: function() {
      this.lightbox.show();
    },

    logout: function() {
      User.logout(function() {
        window.location.reload();
      });
    }


  });

  return Sidebar;

});