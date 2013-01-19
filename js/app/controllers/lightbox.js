define(function(require) {

  var Debugger         = require('app/helpers/debugger');
  var Fb               = require('app/models/fb');
  var Time             = require('app/helpers/time');
  var Analytics        = require('app/models/analytics');
  var SampleData       = require('app/helpers/sample-data');
  var _                = require('underscore');
  var $                = require('jquery');

  var LightboxHtml     = require('text!app/html/lightbox.html');
  var LightboxReadHtml = require('text!app/html/lightbox-read.html');


	var Lightbox = {};

  Lightbox.load = function() {
    var user = window._sr.user, site = window._sr.site, friends = window._sr.friends, activity = window._sr.activity;
    Debugger.log('Loading the lightbox', 0);
    if (!user) {
      Debugger.log("User is not logged in, don't load it");
      Debugger.log('Finished');
      return false;
    }
    Debugger.log('Prepending lightbox to <body>');
    $('<div/>', {
      id: 'sr_lightbox',
      html: "<div id='sr_lightbox_inner'></div>"
    }).prependTo('body');
    if ($('#sr_lightbox_inner').length !== 0) {
      Debugger.log("Lightbox added: SUCCESS");
    } else {
      Debugger.log("Lightbox added: FAILURE");
    }
    return Debugger.log('Finished');
  };

  Lightbox.setup_listeners = function() {
    var _this = this;
    Debugger.log('Setup jQuery listener for close lightbox link click');
    $('a#sr_close_lightbox').on('click', function() {
      return _this.close();
    });
  };

  Lightbox.show = function(type, User) {
    var _this = this;
    Debugger.log('Fade in lightbox', 0);
    Debugger.log('Fading');
    return $('#sr_lightbox').fadeIn('fast', function() {
      _this.show_activity(type, User);
      _this.setup_listeners();
      Analytics.setup_listeners('lightbox');
    });
  };

  Lightbox.close = function() {
    if (this.closing === true) return;
    this.closing = true;
    var _this = this;
    Debugger.log('Closing lightbox', 0);
    Debugger.log('Fading out');
    return $('#sr_lightbox').fadeOut(function() {
      $('#sr_lightbox #sr_lightbox_inner').html('');
      Debugger.log('Html lightbox inner set to blank');
      Debugger.log('Finished');
      delete _this.closing;
    });
  };

  Lightbox.show_activity = function() {
    var _this = this;
    var lightbox_template = _.template(LightboxHtml);
    var lightbox_html = lightbox_template(window._sr);
    $('#sr_lightbox_inner').html(lightbox_html);
      Debugger.log("Putting reads into the lightbox", 0);
      var reads;
      if (SampleData.is_on()) {
        reads = SampleData.reads;
      } else {
        reads = Fb.put_all_reads_in_one_array(window._sr.activity.reads);
      }
      $('#sr_loading').hide();
      if (!reads || !reads.length) {
        Debugger.log('No reads found');
        $('#sr_reads_list').show();
        $('#sr_reads_list #sr_reads_empty').show();
      } else {
        Debugger.log("Found " + reads.length + " reads");
        var html = '';
        var read_template = _.template(LightboxReadHtml);
        _.each(reads, function(read) {
          if (!read.data || !read.data.article || !read.publish_time) {
            return;
          }
          read.relative_time = Time.relative(read.publish_time);
          html += read_template(read);
        });
        $('#sr_reads_list ul').html(html);
        Debugger.log('Html put: SUCCESS');
        Debugger.log('Showing stuff');
        $('#sr_activity_tabs').show();
        $('#sr_reads_list').show();
        Debugger.log('Adding jQuery listener for filter tabs');
        $("#sr_activity_tabs a").on("click", function() {
          Debugger.log('Lightbox activity tab click detected', 0);
          $('#sr_activity_tabs li').removeClass('sr_active_tab');
          Debugger.log('Removed class from existing tab');
          $(this).closest('li').addClass('sr_active_tab');
          Debugger.log('Added class to the clicked tab');
          if ($(this).closest('li').attr('id') === 'sr_lightbox_everyone') {
            Debugger.log('Everyone tab detected, show all stories');
            $('#sr_reads_list ul li').show();
          } else if ($(this).closest('li').attr('id') === 'sr_lightbox_me') {
            Debugger.log('Me tab detected, just show my stories');
            $('#sr_reads_list ul li.sr_friend_story').hide();
          }
          return Debugger.log('Finished');
        });
        Debugger.log('Adding jQuery listener for deleting reads');
        $('.sr_story_delete').on("click", function() {
          var read_id;
          read_id = $(this).closest('li').attr('id').replace('sr_read_', '');
          return Fb.delete_read(read_id, function(cb) {
            return $("#sr_read_"+read_id).fadeOut(function() {
              return $("#sr_read_"+read_id).remove();
            });
          });
        });
        return Debugger.log('Finished');
             
      }

  };


  return Lightbox;

});